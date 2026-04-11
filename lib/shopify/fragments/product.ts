import imageFragment from "./image";
import seoFragment from "./seo";

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    metafields(identifiers: [
      { namespace: "dhatu", key: "tagline" }
      { namespace: "dhatu", key: "bullet_1" }
      { namespace: "dhatu", key: "bullet_2" }
      { namespace: "dhatu", key: "bullet_3" }
      { namespace: "dhatu", key: "bullet_4" }
      { namespace: "dhatu", key: "why_love_it_1" }
      { namespace: "dhatu", key: "why_love_it_2" }
      { namespace: "dhatu", key: "why_love_it_3" }
      { namespace: "dhatu", key: "why_love_it_4" }
      { namespace: "dhatu", key: "why_love_it_5" }
      { namespace: "dhatu", key: "ingredients" }
      { namespace: "dhatu", key: "how_to_use" }
      { namespace: "dhatu", key: "nutrition_serving_size" }
      { namespace: "dhatu", key: "nutrition_calories" }
      { namespace: "dhatu", key: "nutrition_protein_g" }
      { namespace: "dhatu", key: "nutrition_carbs_g" }
      { namespace: "dhatu", key: "nutrition_fiber_g" }
      { namespace: "dhatu", key: "nutrition_fat_g" }
      { namespace: "dhatu", key: "nutrition_sodium_mg" }
      { namespace: "dhatu", key: "nutrition_sugar_g" }
    ]) {
      namespace
      key
      value
    }
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
