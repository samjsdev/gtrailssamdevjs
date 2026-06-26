'use client';

import { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useTemplateData } from '../../context/TemplateContext';

export default function WhatsAppBubble() {
    const [showText, setShowText] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const { data } = useTemplateData();
    const contact = data.contact || {};

    useGSAP(() => {
        gsap.from(container.current, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.5,
            delay: 1,
            ease: 'back.out(1.7)'
        });
    }, { scope: container });

    useEffect(() => {
        const handleScroll = () => {
            // Check if user is near the bottom of the page (within 100px)
            const isBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            setShowText(isBottom);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fallback values if whatsapp data is missing
    const phone = contact.whatsapp?.phone || '919543602232';
    const message = contact.whatsapp?.message || 'Hello! I would like to know more about your services.';

    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

    return (
        <div ref={container} className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex items-center rounded-full bg-[#25d366] px-4 py-2.5 text-white shadow-lg transition-all duration-300 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
                <NextImage
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                />
                <span
                    className={`whitespace-nowrap font-medium transition-all duration-300 overflow-hidden ${showText ? 'ml-3 max-w-[300px] opacity-100' : 'ml-0 max-w-0 opacity-0'
                        }`}
                >
                    WhatsApp us for quick reply
                </span>
            </a>
        </div>
    );
}
