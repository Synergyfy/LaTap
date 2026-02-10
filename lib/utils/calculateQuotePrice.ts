export const calculateQuotePrice = (
    tieredPricing: Array<{ minQuantity: number; maxQuantity?: number; price: number | 'quote' }>,
    quantity: number
): number | 'quote' => {
    if (!tieredPricing || tieredPricing.length === 0) {
        return 'quote';
    }

    // Find the matching tier
    for (const tier of tieredPricing) {
        if (tier.maxQuantity) {
            // Tier has both min and max
            if (quantity >= tier.minQuantity && quantity <= tier.maxQuantity) {
                return tier.price === 'quote' ? 'quote' : tier.price * quantity;
            }
        } else {
            // Tier only has min (last tier)
            if (quantity >= tier.minQuantity) {
                return tier.price === 'quote' ? 'quote' : tier.price * quantity;
            }
        }
    }

    // Fallback to quote if no tier matches
    return 'quote';
};
