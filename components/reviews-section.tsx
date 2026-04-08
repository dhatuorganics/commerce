const reviews = [
  {
    name: "Priya Ramachandran",
    location: "Bengaluru",
    rating: 5,
    date: "March 2025",
    product: "Sprouted Ragi Flour",
    text: "I have been using Dhatu's sprouted ragi flour for six months now and the difference in taste and digestibility is remarkable. My family no longer experiences the heaviness that regular ragi used to cause. Absolutely worth every rupee.",
    avatar: "PR",
  },
  {
    name: "Ananya Krishnan",
    location: "Chennai",
    rating: 5,
    date: "February 2025",
    product: "Sprouted Peanut Butter",
    text: "Finally a peanut butter that is genuinely clean — no sugar, no palm oil, just pure sprouted peanuts. The flavour is deep and nutty. My kids eat it straight off the spoon. I have tried many brands but this one is on a different level entirely.",
    avatar: "AK",
  },
  {
    name: "Meera Iyer",
    location: "Mumbai",
    rating: 5,
    date: "January 2025",
    product: "Sprouted Wheat Flour",
    text: "We switched our household completely to Dhatu's sprouted wheat flour. The rotis are softer, the digestion is easier, and knowing that the grains are traditionally processed gives me peace of mind. You can really taste the difference.",
    avatar: "MI",
  },
  {
    name: "Kavitha Subramanian",
    location: "Hyderabad",
    rating: 5,
    date: "March 2025",
    product: "Organic Cold-Pressed Coconut Oil",
    text: "The aroma of this coconut oil takes me straight back to my grandmother's kitchen. Cold-pressed, pure, and with that authentic Kerala coconut fragrance. I use it daily for cooking as well as hair care. Dhatu is my most trusted brand now.",
    avatar: "KS",
  },
  {
    name: "Deepa Nair",
    location: "Kochi",
    rating: 5,
    date: "February 2025",
    product: "Sprouted Millet Mix",
    text: "As a nutritionist I recommend Dhatu products to all my clients. The sprouting process genuinely increases nutrient bioavailability and the third-party certifications give confidence. Exceptional quality that I stake my professional reputation on.",
    avatar: "DN",
  },
  {
    name: "Shalini Menon",
    location: "Pune",
    rating: 5,
    date: "January 2025",
    product: "Sprouted Moong Dal",
    text: "I was sceptical at first but after three months of using Dhatu's sprouted moong dal my digestion has improved dramatically. The dal cooks faster, tastes better, and I feel lighter after every meal. Truly living food as they describe it.",
    avatar: "SM",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#CC9966">
          <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full py-16" style={{ backgroundColor: "#2C2C2C" }}>
      <div className="px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="mb-3 block text-xs uppercase tracking-[0.35em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            What Our Customers Say
          </span>
          <h2
            className="mb-3 text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
          >
            Real People, Real Results
          </h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating count={5} />
            <span
              className="text-sm"
              style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
            >
              5.0 · Loved by 500,000+ customers across India
            </span>
          </div>
        </div>

        {/* Reviews grid — 3 columns */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: "#363636",
                border: "1px solid #CC996618",
              }}
            >
              {/* Top row: avatar + name + stars */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #CC9966, #669999)",
                      color: "#FAF7F2",
                      fontFamily: "var(--font-nobel)",
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium leading-tight"
                      style={{ color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: "#666666", fontFamily: "var(--font-nobel)" }}
                    >
                      {review.location}
                    </p>
                  </div>
                </div>
                <StarRating count={review.rating} />
              </div>

              {/* Product tag */}
              <div className="mb-3">
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider"
                  style={{
                    backgroundColor: "#CC996615",
                    color: "#CC9966",
                    fontFamily: "var(--font-nobel)",
                    border: "1px solid #CC996625",
                  }}
                >
                  {review.product}
                </span>
              </div>

              {/* Review text */}
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: "#BBBBBB", fontFamily: "var(--font-nobel)" }}
              >
                "{review.text}"
              </p>

              {/* Date */}
              <p
                className="mt-4 text-[11px]"
                style={{ color: "#555555", fontFamily: "var(--font-nobel)" }}
              >
                {review.date} · Verified Purchase
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
