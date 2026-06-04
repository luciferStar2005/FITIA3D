import { useEffect } from 'react';

export type ModalType = 'info' | 'confirm' | 'success' | 'error';

export interface ModalConfig {
    isOpen: boolean;
    title: string;
    message: string;
    type?: ModalType;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

interface ModalProps extends ModalConfig {
    onClose: () => void;
}

const iconByType: Record<ModalType, JSX.Element> = {
    success: (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#4ade80" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        </div>
    ),
    error: (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#f87171" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
        </div>
    ),
    info: (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a78bfa" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
        </div>
    ),
    confirm: (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#fb923c" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
        </div>
    ),
};

const titleColorByType: Record<ModalType, string> = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-purple-400',
    confirm: 'text-orange-400',
};

export const defaultModal: ModalConfig = {
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
};

export default function Modal({ isOpen, title, message, type = 'info', onClose, onConfirm, confirmText = 'Confirmar', cancelText = 'Cancelar' }: ModalProps) {
    // Cerrar con Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-neutral-900 border border-white/[0.1] rounded-2xl p-8 max-w-md w-full shadow-[0_8px_40px_rgba(0,0,0,0.8)] relative animate-[fadeIn_0.15s_ease-out]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                {iconByType[type]}

                {/* Title */}
                <h2 className={`font-['Bebas_Neue'] text-3xl tracking-wider mb-2 ${titleColorByType[type]}`}>
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-300 text-sm mb-6 whitespace-pre-line leading-relaxed">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    {type === 'confirm' ? (
                        <>
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => { onConfirm?.(); onClose(); }}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer"
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className={`w-full py-3 font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer
                                ${type === 'success' ? 'bg-green-600 hover:bg-green-500 text-white' :
                                  type === 'error'   ? 'bg-red-600 hover:bg-red-500 text-white' :
                                                       'bg-purple-600 hover:bg-purple-500 text-white'}`}
                        >
                            Entendido
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Hook reutilizable
export function useModal() {
    const [modal, setModal] = useState<ModalConfig>(defaultModal);

    const showModal = (title: string, message: string, type: ModalType = 'info', onConfirm?: () => void) => {
        setModal({ isOpen: true, title, message, type, onConfirm });
    };

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    return { modal, showModal, closeModal };
}

// Necesario para el hook
import { useState } from 'react';
