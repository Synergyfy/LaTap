'use client';

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, CornerUpRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DynamicQRCodeProps {
    redirectId?: string;
    customUrl?: string;
    label: string;
    subLabel?: string;
    color?: string;
    size?: number;
}

export default function DynamicQRCode({
    redirectId,
    customUrl,
    label,
    subLabel = 'Dynamic Link',
    color = '#000000',
    size = 300
}: DynamicQRCodeProps) {
    const qrContainerRef = useRef<HTMLDivElement>(null);

    // The "permanent" URL that will be printed
    // If customUrl is provided, use it. Otherwise construct api/q/id
    const getRedirectUrl = () => {
        if (customUrl) return customUrl;

        if (typeof window !== 'undefined') {
            return `${window.location.origin}/api/q/${redirectId}`;
        }
        return `/api/q/${redirectId}`;
    };

    const handleDownloadPDF = async () => {
        if (!qrContainerRef.current) return;

        try {
            const canvas = await html2canvas(qrContainerRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
            } as any);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgProps = { width: canvas.width, height: canvas.height };
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Center vertically and horizontally
            const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;

            pdf.addImage(imgData, 'PNG', 0, y, pdfWidth, pdfHeight);
            pdf.save(`vemtap-qr-${redirectId}.pdf`);
            toast.success('QR Code PDF downloaded!');
        } catch (error) {
            console.error('PDF Generation Error:', error);
            toast.error('Failed to generate PDF');
        }
    };

    const handleCopyLink = () => {
        const url = getRedirectUrl();
        navigator.clipboard.writeText(url);
        toast.success('Dynamic link copied to clipboard');
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm">
            {/* Capture Area for PDF */}
            <div
                ref={qrContainerRef}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-full mb-6 flex flex-col items-center text-center"
            >
                <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-6">
                    <QRCodeCanvas
                        value={getRedirectUrl()}
                        size={size}
                        bgColor={"#ffffff"}
                        fgColor={color}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>

                <h3 className="font-bold text-gray-900 text-2xl mb-1">{label}</h3>
                <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1 mb-3">
                    <CornerUpRight size={14} />
                    {subLabel}
                </p>
                <div className="text-[10px] bg-blue-50 text-blue-600 py-1.5 px-3 rounded-lg inline-block font-mono border border-blue-100 font-bold">
                    ID: {redirectId}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 border border-gray-200"
                >
                    <Share2 size={16} />
                    Copy Link
                </button>
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-900/20"
                >
                    <Download size={16} />
                    Download PDF
                </button>
            </div>

            <div className="mt-4 text-[10px] text-center text-gray-400 font-medium max-w-[250px]">
                * This QR code is dynamic. You can change its destination URL effectively updating where it scans to.
            </div>
        </div>
    );
}
