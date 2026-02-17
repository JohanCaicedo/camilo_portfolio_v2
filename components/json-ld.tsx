export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Paper Fox Studio",
        "url": "https://paperfoxstudio.com",
        "logo": "https://paperfoxstudio.com/icon.svg",
        "founder": {
            "@type": "Person",
            "name": "Johan Caicedo",
            "url": "https://paperfoxstudio.com",
            "jobTitle": "Creative Director & Developer",
            "sameAs": [
                "https://github.com/paperfoxstudio",
                "https://www.linkedin.com/in/johan-caicedo"
            ]
        },
        "description": "Crafting immersive web experiences that blend creativity with cutting-edge technology.",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "contact@paperfoxstudio.com"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
