import { model, Schema } from 'mongoose';

const ContentSchema = new Schema(
  {
    heroSection: { type: Object, default: {} },
    aboutUsSection: { type: Object, default: {} },
    advantageSection: { type: Object, default: {} },
    servicesSection: { type: Object, default: {} },
    productsSection: { type: Object, default: {} },
    analytics: { type: Object, default: {} },
    clientSection: { type: Object, default: {} },
    partnersSection: { type: Object, default: {} },
    contactUsSection: { type: Object, default: {} },
    faqSection: { type: Object, default: {} },
    ctaSection: { type: Object, default: {} },
    footerSection: { type: Object, default: {} },

    whatWeDoPage: { type: Object, default: {} },
    whoWeArePage: { type: Object, default: {} },
    contactUsPage: { type: Object, default: {} },
    productsPage: { type: Object, default: {} },
    productItemPage: { type: Object, default: {} },

    encouragecard: { type: Object, default: {} },
    mapDesignCard: { type: Object, default: {} },
    team: { type: Object, default: {} },
  },
  { _id: false }
);

const WebContentSchema = new Schema({
       publishedContent: {
      type: ContentSchema,
      default: () => ({})
    },

    draftContent: {
      type: ContentSchema,
      default: () => ({})
    },

    lastPublishedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default model('WebContent', WebContentSchema);