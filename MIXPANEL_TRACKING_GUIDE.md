# Mixpanel User Journey Tracking Guide

## Overview

This guide explains how to track user journeys through your Sidetool website using Mixpanel. The implementation provides comprehensive insights into user behavior, conversion funnels, and engagement patterns.

## Key Tracking Events

### 1. **Page Navigation**
- `Page Viewed` - Tracks all page visits with UTM attribution
- `Section Viewed` - Tracks when users scroll to specific sections
- `Page Scroll` - Tracks scroll depth (25%, 50%, 75%, 90%)
- `Time on Page` - Tracks engagement duration

### 2. **Conversion Events**
- `CTA Clicked` - Tracks all call-to-action button clicks
- `Form Started` - When user begins filling a form
- `Form Submitted` - Successful form submissions
- `Conversion` - High-value actions with estimated value

### 3. **Content Engagement**
- `Case Study Viewed` - Specific case study interactions
- `Solution Interest` - Solution page engagement
- `Pricing Viewed` - Pricing section visibility
- `Video Played` - Video content interaction

## User Journey Stages

### Stage 1: Awareness
**Entry Points:**
- Blog posts (`/post/*`)
- Campaign pages (`/campaign/*`)
- Organic search (tracked via referrer)
- Social media (tracked via UTM parameters)

**Key Metrics:**
- Traffic sources
- Landing page performance
- Initial engagement time

### Stage 2: Interest
**Behaviors:**
- Homepage section views
- Solution page visits
- Case study browsing
- Video plays

**Key Metrics:**
- Section completion rates
- Content engagement depth
- Multi-page sessions

### Stage 3: Consideration
**Behaviors:**
- Pricing section views
- Multiple case study views
- Extended time on site
- Multiple solution pages

**Key Metrics:**
- Pricing view conversion rates
- Content consumption patterns
- Return visitor behavior

### Stage 4: Conversion
**Actions:**
- Contact form submissions
- Calendar booking clicks
- Phone number clicks
- Email interactions

**Key Metrics:**
- Form completion rates
- CTA click-through rates
- Conversion attribution

## Implementation Examples

### Adding Tracking to Components

#### 1. Hero Section Tracking
```astro
---
// In your Hero.astro component
---

<script>
import { trackSectionView, trackCTAClick } from '../js/mixpanel';

document.addEventListener('DOMContentLoaded', () => {
    // Track hero section view
    const hero = document.getElementById('main-hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackSectionView('Hero', 'Home');
            }
        });
    }, { threshold: 0.5 });
    
    if (hero) observer.observe(hero);
    
    // Track CTA clicks
    const ctaButton = hero.querySelector('[href*="book"], [href*="contact"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            trackCTAClick('Book Intro Call', 'Hero', ctaButton.href);
        });
    }
});
</script>
```

#### 2. Case Study Tracking
```astro
---
// In your case study components
import { trackCaseStudyView } from '../js/mixpanel';
---

<script define:vars={{ caseStudyName, industry }}>
document.addEventListener('DOMContentLoaded', () => {
    trackCaseStudyView(caseStudyName, industry);
});
</script>
```

#### 3. Form Enhancement
```astro
---
// In ContactFormV2.astro, add data attributes
---

<form id="contact-form" data-form-name="Contact Form" data-form-location="Contact Page">
    <!-- Your existing form fields -->
</form>

<script>
import { formTracker } from '../js/useFormTracking';
// Form tracking is automatically set up via the formTracker
</script>
```

## Mixpanel Dashboard Setup

### Key Funnels to Create

#### 1. **Awareness to Interest Funnel**
```
Page Viewed (any) → Section Viewed → CTA Clicked
```

#### 2. **Interest to Conversion Funnel**
```
Solution Interest → Pricing Viewed → Form Started → Form Submitted
```

#### 3. **Content Engagement Funnel**
```
Blog Post → Case Study Viewed → Solution Interest → Conversion
```

### Key Cohorts to Define

#### 1. **High-Intent Visitors**
- Viewed pricing
- Spent >2 minutes on site
- Viewed multiple case studies

#### 2. **Campaign Traffic**
- Has UTM parameters
- Specific campaign attribution

#### 3. **Return Visitors**
- Multiple sessions
- Different entry points

### Important Reports

#### 1. **Attribution Report**
- Traffic sources performance
- Campaign ROI
- Channel effectiveness

#### 2. **Content Performance**
- Most engaging blog posts
- Top-converting case studies
- Effective solution pages

#### 3. **Conversion Analysis**
- Form abandonment points
- CTA performance by location
- Journey completion rates

## Advanced Tracking Options

### 1. **User Identification**
When users submit forms, identify them in Mixpanel:

```javascript
import mixpanel from './mixpanel';

// After successful form submission
mixpanel.identify(userEmail);
mixpanel.people.set({
    '$email': userEmail,
    '$name': userName,
    'lead_source': 'Website Form',
    'first_contact_date': new Date().toISOString()
});
```

### 2. **Revenue Tracking**
Track estimated deal values:

```javascript
mixpanel.track('Conversion', {
    'revenue': 5900, // Monthly subscription value
    'deal_stage': 'Lead Generated',
    'estimated_ltv': 70800 // 12 months * $5,900
});
```

### 3. **A/B Testing Integration**
Track experiment participation:

```javascript
mixpanel.track('Experiment Viewed', {
    'experiment_name': 'Hero CTA Test',
    'variant': 'Version B',
    'page': 'Home'
});
```

## Key Insights You'll Gain

### 1. **User Journey Optimization**
- Identify drop-off points in the funnel
- Optimize high-performing content
- Improve low-converting pages

### 2. **Content Strategy**
- Which blog posts drive most conversions
- Most effective case studies
- Optimal content length and format

### 3. **Campaign Performance**
- ROI by traffic source
- Best-performing UTM campaigns
- Conversion rates by channel

### 4. **Product Development**
- Which solutions generate most interest
- Feature requests from form submissions
- Market demand indicators

## Privacy and Compliance

### GDPR/Privacy Considerations
- Respect user consent preferences
- Implement opt-out mechanisms
- Anonymize sensitive data

```javascript
// Example consent check
if (userConsent.analytics) {
    initMixpanel();
    trackPageView(pageName);
}
```

## Monitoring and Maintenance

### Regular Reviews
1. **Weekly**: Campaign performance, form conversion rates
2. **Monthly**: User journey analysis, content performance
3. **Quarterly**: Full funnel optimization review

### Data Quality Checks
- Verify event firing correctly
- Check for duplicate events
- Monitor data accuracy

### Performance Optimization
- Minimize tracking script impact
- Use efficient event batching
- Regular cleanup of old events

## Getting Started Checklist

- [ ] Mixpanel token configured in environment
- [ ] Basic tracking implemented and tested
- [ ] Key funnels created in Mixpanel dashboard
- [ ] Important cohorts defined
- [ ] Team trained on using reports
- [ ] Regular review schedule established

## Troubleshooting

### Common Issues
1. **Events not firing**: Check browser console for errors
2. **Duplicate events**: Verify event listeners aren't double-bound
3. **Missing UTM data**: Ensure parameters persist across page loads

### Debug Mode
Enable debug mode in development:
```javascript
mixpanel.init(MIXPANEL_TOKEN, { 
    debug: true,  // Shows events in console
    autotrack: false 
});
```

This tracking system will provide comprehensive insights into your user journey, helping you optimize conversion rates and improve user experience across your Sidetool website.