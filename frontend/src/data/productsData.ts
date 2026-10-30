import { getProducts } from "@/api/getProducts";

export let productsLoadError: string | null = null;

export const products = await getProducts().catch((error: unknown) => {
    productsLoadError = error instanceof Error
        ? error.message
        : "The product catalog request failed.";
    console.error("Unable to load the product catalog.", error);
    return [];
});