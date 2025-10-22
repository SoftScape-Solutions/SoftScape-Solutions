'use strict';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { debounce, throttle, createLazyObserver } from '../utils/helpers';

// Custom hook for mobile menu state management
export const useMobileMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = debounce(() => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        }, 250);

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    };
};

// Custom hook for scroll-based functionality
export const useScrollBehavior = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let timeoutId;
        
        const handleScroll = throttle(() => {
            setScrollY(window.scrollY);
            setIsScrolling(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    return { scrollY, isScrolling };
};

// Custom hook for scroll animations
export const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = createLazyObserver((target) => {
            target.classList.add('visible');
        }, observerOptions);

        const elements = document.querySelectorAll('.scroll-fade-in');
        let i = 0;
        const len = elements.length;
        
        for (; i < len; i++) {
            observer.observe(elements[i]);
        }

        return () => {
            for (i = 0; i < len; i++) {
                observer.unobserve(elements[i]);
            }
            observer.disconnect();
        };
    }, []);
};

// Custom hook for scroll restoration
export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [pathname]);
};