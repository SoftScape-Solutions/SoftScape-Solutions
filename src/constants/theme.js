'use strict';

/**
 * Central Color Theme Configuration
 * Defines the consistent color scheme used across the entire application
 */

// Primary brand colors - Blue to Purple gradient theme
export const BRAND_COLORS = Object.freeze({
  // Primary gradients
  primaryGradient: 'from-blue-600 to-purple-600',
  primaryGradientHover: 'from-blue-700 to-purple-700',
  
  // Hero/Header backgrounds
  heroBackground: 'from-blue-50 via-purple-50 to-pink-50',
  sectionBackground: 'from-slate-50 to-blue-50',
  
  // Icon gradients
  iconPrimary: 'from-blue-600 to-purple-600',
  iconBlue: 'from-blue-500 to-cyan-500',
  iconPurple: 'from-purple-500 to-pink-500',
  iconGreen: 'from-green-500 to-emerald-500',
  iconOrange: 'from-orange-500 to-red-500',
  iconIndigo: 'from-indigo-500 to-blue-500',
  iconTeal: 'from-teal-500 to-cyan-500',
  
  // Card enhancements
  cardGlow: 'from-purple-600 to-blue-600',
  cardHighlight: 'from-blue-100 to-purple-100',
  
  // Text gradients
  textGradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  
  // Background variations
  bgWhite: 'bg-white',
  bgLight: 'bg-gradient-to-br from-slate-50 to-blue-50',
  bgDark: 'bg-gradient-to-br from-gray-900 to-blue-900',
});

// Helper functions to generate className strings
export const getHeroClasses = () => 
  `bg-gradient-to-br ${BRAND_COLORS.heroBackground}`;

export const getSectionClasses = () => 
  `bg-gradient-to-br ${BRAND_COLORS.sectionBackground}`;

export const getPrimaryIconClasses = () => 
  `bg-gradient-to-r ${BRAND_COLORS.iconPrimary}`;

export const getCardGlowClasses = () => 
  `bg-gradient-to-br ${BRAND_COLORS.cardGlow}`;

// Standardized class combinations
export const THEME_CLASSES = Object.freeze({
  // Hero sections
  heroSection: `pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${BRAND_COLORS.heroBackground}`,
  
  // Content sections
  contentSection: `py-20 px-4 sm:px-6 lg:px-8 bg-white`,
  alternateSection: `py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${BRAND_COLORS.sectionBackground}`,
  
  // Primary icon container
  primaryIcon: `w-20 h-20 bg-gradient-to-r ${BRAND_COLORS.iconPrimary} rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in`,
  
  // Card icon container
  cardIcon: `w-16 h-16 bg-gradient-to-r ${BRAND_COLORS.iconPrimary} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow`,
  
  // CTA sections
  ctaSection: `py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${BRAND_COLORS.cardGlow} text-white`,
  
  // Gradient text
  gradientText: BRAND_COLORS.textGradient,
});

export default BRAND_COLORS;
