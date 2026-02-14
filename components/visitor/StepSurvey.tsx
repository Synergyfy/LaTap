import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { presets } from './presets';

interface Question {
    id: string;
    text: string;
    type: 'rating' | 'choice' | 'text';
    options?: string[];
}

interface StepSurveyProps {
    questions: Question[];
    onComplete: (answers: Record<string, any>) => void;
    onSkip: () => void;
}

export const StepSurvey: React.FC<StepSurveyProps> = ({ questions, onComplete, onSkip }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [textValue, setTextValue] = useState('');

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (value: any) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTextValue('');
        } else {
            onComplete(newAnswers);
        }
    };

    return (
        <motion.div
            key="survey"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={presets.card}
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 w-6 rounded-full transition-all duration-300 ${i <= currentQuestionIndex ? 'bg-primary' : 'bg-gray-100'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={onSkip}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                >
                    Skip
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-left"
                >
                    <span className={presets.tag}>Question {currentQuestionIndex + 1}</span>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8 mt-2">
                        {currentQuestion.text}
                    </h2>

                    {currentQuestion.type === 'rating' && (
                        <div className="space-y-4">
                            <div className="flex justify-between px-1">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Bad</span>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Good</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => handleAnswer(num)}
                                        className="flex-1 aspect-square rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center text-lg font-black text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentQuestion.type === 'choice' && (
                        <div className="space-y-3">
                            {currentQuestion.options?.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 text-left text-sm font-bold text-slate-700 hover:border-primary/30 hover:bg-white transition-all active:scale-[0.99]"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'text' && (
                        <div className="space-y-4">
                            <textarea
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                placeholder="Type your response here..."
                                className="w-full h-32 p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none text-sm font-medium transition-all"
                            />
                            <button
                                onClick={() => handleAnswer(textValue)}
                                disabled={!textValue.trim()}
                                className={presets.button}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};
