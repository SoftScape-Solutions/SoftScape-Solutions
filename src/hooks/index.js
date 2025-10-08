import { useState, useEffect } from 'react';

// Custom hook for mobile menu state
export const useMobileMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    };
};

// Custom hook for scroll animations
export const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.scroll-fade-in');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);
};

// Custom hook for chat functionality
export const useChat = (initialMessages = []) => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = (message) => {
        if (!message.trim()) return;

        const newMessages = [...messages, { type: 'user', text: message }];
        setMessages(newMessages);
        setInputMessage('');

        // Simulate bot typing
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateBotResponse = (userMessage) => {
        const responses = [
            "That's a great question! Our AI chatbots can definitely help with that.",
            "I'd be happy to help you learn more about our AI solutions.",
            "Our team specializes in creating custom AI tools for businesses like yours.",
            "That's exactly the kind of problem our AI automation tools are designed to solve!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    return {
        messages,
        inputMessage,
        setInputMessage,
        isTyping,
        sendMessage
    };
};

// Custom hook for form handling
export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (onSubmit, validationRules = {}) => {
        setIsSubmitting(true);

        // Validate form
        const newErrors = {};
        Object.keys(validationRules).forEach(field => {
            const rule = validationRules[field];
            if (rule.required && !values[field]) {
                newErrors[field] = `${field} is required`;
            }
            if (rule.minLength && values[field]?.length < rule.minLength) {
                newErrors[field] = `${field} must be at least ${rule.minLength} characters`;
            }
            if (rule.email && values[field] && !/\S+@\S+\.\S+/.test(values[field])) {
                newErrors[field] = 'Please enter a valid email address';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return false;
        }

        try {
            await onSubmit(values);
            setValues(initialValues);
            setIsSubmitting(false);
            return true;
        } catch (error) {
            setErrors({ submit: error.message });
            setIsSubmitting(false);
            return false;
        }
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        reset
    };
};