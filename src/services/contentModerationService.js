// AI-Powered Content Moderation Service
// This service handles automatic screening of user-generated content

class ContentModerationService {
  constructor() {
    // Inappropriate words and phrases database
    this.inappropriateWords = [
      'abuse', 'hate', 'discriminat', 'harassment', 'bullying', 'threaten',
      'violent', 'inappropriate', 'offensive', 'profanity', 'sexual',
      'racist', 'sexist', 'homophobic', 'derogatory', 'insult'
    ];
    
    // Spam patterns
    this.spamPatterns = [
      /(.)\1{4,}/g, // Repeated characters
      /^[A-Z\s!]{20,}$/g, // All caps long messages
      /http[s]?:\/\/[^\s]+/g, // URLs (might be spam)
    ];
    
    // Positive sentiment keywords
    this.positiveKeywords = [
      'excellent', 'great', 'good', 'helpful', 'clear', 'understanding',
      'patient', 'knowledgeable', 'organized', 'engaging', 'supportive',
      'recommend', 'effective', 'thorough', 'professional', 'inspiring'
    ];
    
    // Constructive feedback keywords
    this.constructiveKeywords = [
      'suggest', 'improve', 'consider', 'perhaps', 'might', 'could',
      'feedback', 'recommendation', 'alternative', 'enhance', 'develop'
    ];
  }

  // Main moderation function
  moderateContent(content, type = 'review') {
    const analysis = this.analyzeContent(content);
    
    return {
      isApproved: analysis.score >= 0.5,
      confidence: analysis.confidence,
      flags: analysis.flags,
      suggestions: analysis.suggestions,
      processedContent: this.sanitizeContent(content),
      moderationReason: analysis.reason
    };
  }

  // Analyze content and return moderation score
  analyzeContent(content) {
    const text = content.toLowerCase().trim();
    let score = 1.0; // Start with full approval
    let confidence = 0.8;
    let flags = [];
    let suggestions = [];
    let reason = '';

    // Check for inappropriate content
    const inappropriateScore = this.checkInappropriateContent(text);
    if (inappropriateScore > 0.3) {
      score -= inappropriateScore;
      flags.push('inappropriate_language');
      suggestions.push('Please use respectful and professional language');
      reason = 'Contains inappropriate or offensive language';
    }

    // Check for spam patterns
    const spamScore = this.checkSpamPatterns(text);
    if (spamScore > 0.2) {
      score -= spamScore;
      flags.push('potential_spam');
      suggestions.push('Avoid repetitive characters and focus on meaningful content');
      reason = 'Content appears to be spam or low-quality';
    }

    // Check content length and quality
    const qualityScore = this.assessContentQuality(text);
    if (qualityScore < 0.3) {
      score -= 0.2;
      flags.push('low_quality');
      suggestions.push('Please provide more detailed and constructive feedback');
    }

    // Boost score for constructive content
    const constructiveBonus = this.getConstructiveBonus(text);
    score += constructiveBonus;

    // Ensure score is between 0 and 1
    score = Math.max(0, Math.min(1, score));
    
    // Adjust confidence based on content analysis
    if (flags.length === 0 && score > 0.8) {
      confidence = 0.95;
    } else if (flags.length > 2 || score < 0.3) {
      confidence = 0.9;
    }

    return {
      score,
      confidence,
      flags,
      suggestions,
      reason: reason || 'Content approved'
    };
  }

  // Check for inappropriate words and phrases
  checkInappropriateContent(text) {
    let inappropriateCount = 0;
    const words = text.split(/\s+/);
    
    this.inappropriateWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      if (matches) {
        inappropriateCount += matches.length;
      }
    });

    // Return severity score (0-1)
    return Math.min(inappropriateCount / words.length * 5, 1);
  }

  // Check for spam patterns
  checkSpamPatterns(text) {
    let spamScore = 0;
    
    this.spamPatterns.forEach(pattern => {
      if (pattern.test(text)) {
        spamScore += 0.3;
      }
    });

    // Check for excessive repetition
    const words = text.split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = 1 - (uniqueWords.size / words.length);
    
    if (repetitionRatio > 0.7) {
      spamScore += 0.4;
    }

    return Math.min(spamScore, 1);
  }

  // Assess overall content quality
  assessContentQuality(text) {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Length check
    if (words.length < 3) return 0.1;
    if (words.length < 10) return 0.3;
    
    // Sentence structure check
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    let qualityScore = 0.5;
    
    if (avgWordsPerSentence > 5 && avgWordsPerSentence < 25) {
      qualityScore += 0.3;
    }
    
    // Check for meaningful content
    const meaningfulWords = words.filter(word => 
      word.length > 3 && !['this', 'that', 'very', 'really', 'just'].includes(word)
    );
    
    if (meaningfulWords.length / words.length > 0.4) {
      qualityScore += 0.2;
    }
    
    return Math.min(qualityScore, 1);
  }

  // Give bonus for constructive feedback
  getConstructiveBonus(text) {
    let bonus = 0;
    
    // Check for positive language
    this.positiveKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        bonus += 0.05;
      }
    });
    
    // Check for constructive language
    this.constructiveKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        bonus += 0.1;
      }
    });
    
    return Math.min(bonus, 0.3);
  }

  // Clean up content while preserving meaning
  sanitizeContent(content) {
    let sanitized = content;
    
    // Remove potential malicious patterns
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    // Clean up excessive punctuation
    sanitized = sanitized.replace(/[!]{3,}/g, '!!');
    sanitized = sanitized.replace(/[?]{3,}/g, '??');
    sanitized = sanitized.replace(/[.]{3,}/g, '...');
    
    // Trim whitespace
    sanitized = sanitized.trim();
    
    return sanitized;
  }

  // Generate moderation report for administrators
  generateModerationReport(content, analysis) {
    return {
      timestamp: new Date(),
      originalContent: content,
      moderationScore: analysis.score,
      flags: analysis.flags,
      autoApproved: analysis.isApproved,
      requiresManualReview: analysis.score < 0.7 && analysis.score > 0.3,
      recommendations: analysis.suggestions,
      riskLevel: this.calculateRiskLevel(analysis.score, analysis.flags)
    };
  }

  // Calculate risk level for content
  calculateRiskLevel(score, flags) {
    if (score < 0.3 || flags.includes('inappropriate_language')) {
      return 'HIGH';
    } else if (score < 0.7 || flags.length > 1) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  // Get suggestions for improving content
  getImprovementSuggestions(content) {
    const analysis = this.analyzeContent(content);
    const suggestions = [...analysis.suggestions];
    
    if (content.length < 50) {
      suggestions.push('Consider providing more detailed feedback to help others');
    }
    
    if (!this.hasConstructiveLanguage(content)) {
      suggestions.push('Try to include specific examples or suggestions for improvement');
    }
    
    if (this.isAllNegative(content)) {
      suggestions.push('Consider balancing criticism with positive observations');
    }
    
    return suggestions;
  }

  // Check if content has constructive language
  hasConstructiveLanguage(content) {
    const text = content.toLowerCase();
    return this.constructiveKeywords.some(keyword => text.includes(keyword));
  }

  // Check if content is overly negative
  isAllNegative(content) {
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'useless', 'horrible'];
    const text = content.toLowerCase();
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    const positiveCount = this.positiveKeywords.filter(word => text.includes(word)).length;
    
    return negativeCount > positiveCount && negativeCount > 2;
  }

  // Batch moderate multiple contents
  batchModerate(contents) {
    return contents.map(content => ({
      original: content,
      moderation: this.moderateContent(content)
    }));
  }
}

// Export singleton instance
export default new ContentModerationService();