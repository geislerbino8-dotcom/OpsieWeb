import { model, Schema } from 'mongoose';

const WebContentSchema = new Schema({
    heroSection: {type: Object},
     aboutUsSection: { type: Object },
    advantagesSection: { type: Object },
    servicesSection: { type: Object },
    productsSection: { type: Object },
    analytics: { type: Object },
    clientSection: { type: Object },
    partnersSection: { type: Object },
    contactUsSection: { type: Object },
    faqSection: { type: Object },
    ctaSection: { type: Object },
    footerSection: { type: Object },

    // Page Specific Content
    whatWeDoPage: { type: Object },
    whoWeArePage: { type: Object },
    contactUsPage: { type: Object },
    productsPage: { type: Object },
    productItemPage: { type: Object },

    // The 'contents' object from your image
    contents: { type: Object }
}, { 
    timestamps: true // Useful for tracking when content was last updated
});

export default model('WebContent', WebContentSchema);