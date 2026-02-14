import { fetchProductDetail } from '@/lib/api/marketplace';
import ProductClient from './ProductClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchProductDetail(id);

    if (!product) {
        return {
            title: 'Product Not Found | VemTap Market',
            description: 'The requested product could not be found.'
        };
    }

    return {
        title: `${product.name} | VemTap Market`,
        description: product.description || `Buy ${product.name} at the best price on VemTap Market.`,
        openGraph: {
            title: `${product.name} | VemTap Market`,
            description: product.description,
            images: product.images || []
        }
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductClient id={id} />;
}
