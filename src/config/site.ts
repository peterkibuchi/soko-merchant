interface SiteConfig {
  name: string;
  description: string;
  url: string;
  creator: string;
  authors: { name: string; url: string }[];
  keywords: string[];
  ogImage?: string;
  links: {
    github: string;
    twitter?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Soko",
  description:
    "Revolutionize your online business with the Soko Ecommerce Platform. Seamlessly create and manage your store, and provide shoppers with a secure and convenient buying experience.",
  url: "https://rave.vercel.app",
  creator: "Peter Kibuchi",
  authors: [{ name: "Peter Kibuchi", url: "https://github.com/peterkibuchi" }],
  keywords: ["Ecommerce", "Soko"],
  links: {
    github: "https://github.com/peterkibuchi/soko",
  },
};
