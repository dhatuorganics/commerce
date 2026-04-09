const reviews = [
  {
    name: "Priya Ramachandran",
    location: "Bengaluru",
    rating: 5,
    date: "March 2025",
    product: "Sprouted Ragi Flour",
    text: "I have been using Dhatu's sprouted ragi flour for six months now and the difference in taste and digestibility is remarkable. My family no longer experiences the heaviness that regular ragi used to cause. Absolutely worth every rupee.",
    avatar: "PR",
    avatarBg: "#F5EFE8",
    avatarColor: "#C4905A",
  },
  {
    name: "Ananya Krishnan",
    location: "Chennai",
    rating: 5,
    date: "February 2025",
    product: "Sprouted Peanut Butter",
    text: "Finally a peanut butter that is genuinely clean — no sugar, no palm oil, just pure sprouted peanuts. The flavour is deep and nutty. My kids eat it straight off the spoon. I have tried many brands but this one is on a different level entirely.",
    avatar: "AK",
    avatarBg: "#EBF5EE",
    avatarColor: "#5A9A70",
  },
  {
    name: "Meera Iyer",
    location: "Mumbai",
    rating: 5,
    date: "January 2025",
    product: "Sprouted Wheat Flour",
    text: "We switched our household completely to Dhatu's sprouted wheat flour. The rotis are softer, the digestion is easier, and knowing that the grains are traditionally processed gives me peace of mind. You can really taste the difference.",
    avatar: "MI",
    avatarBg: "#EEF2F8",
    avatarColor: "#5A72A0",
  },
  {
    name: "Kavitha Subramanian",
    location: "Hyderabad",
    rating: 5,
    date: "March 2025",
    product: "Organic Coconut Oil",
    text: "The aroma of this coconut oil takes me straight back to my grandmother's kitchen. Cold-pressed, pure, and with that authentic Kerala coconut fragrance. I use it daily for cooking as well as hair care. Dhatu is my most trusted brand.",
    avatar: "KS",
    avatarBg: "#F5F0EB",
    avatarColor: "#A07850",
  },
  {
    name: "Deepa Nair",
    location: "Kochi",
    rating: 5,
    date: "February 2025",
    product: "Sprouted Millet Mix",
    text: "As a nutritionist I recommend Dhatu products to all my clients. The sprouting process genuinely increases nutrient bioavailability and the third-party certifications give confidence. Exceptional quality that I stake my professional reputation on.",
    avatar: "DN",
    avatarBg: "#F2EEF6",
    avatarColor: "#8A6AAA",
  },
  {
    name: "Shalini Menon",
    location: "Pune",
    rating: 5,
    date: "January 2025",
    product: "Sprouted Moong Dal",
    text: "I was sceptical at first but after three months of using Dhatu's sprouted moong dal my digestion has improved dramatically. The dal cooks faster, tastes better, and I feel lighter after every meal. Truly living food as they describe it.",
    avatar: "SM",
    avatarBg: "#EDF5F5",
    avatarColor: "#4A8A8A",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#CC9966">
          <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full py-12" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="px-6 md:px-12">

        {/* Header */}
        <div className="mb-8 text-center">
          <span
            className="mb-2 block text-[10px] uppercase tracking-[0.35em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            What Our Customers Say
          </span>
          <h2
            className="mb-3 text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            Real People, Real Results
          </h2>
          <div className="flex items-center justify-center gap-2">
            <StarRating count={5} />
            <span
              className="text-xs"
              style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
            >
              5.0 · Loved by 500,000+ customers across India
            </span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl p-5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #EEEBE5",
                boxShadow: "0 1px 8px rgba(44,44,44,0.04)",
              }}
            >
              {/* Top row: avatar + name + stars */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: review.avatarBg,
                      color: review.avatarColor,
                      fontFamily: "var(--font-nobel)",
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium leading-tight"
                      style={{ color: "#2C2C2C", fontFamily: "var(--font-nobel)" }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "#AAAAAA", fontFamily: "var(--font-nobel)" }}
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
                  className="rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
                  style={{
                    backgroundColor: "#F5F0E8",
                    color: "#CC9966",
                    fontFamily: "var(--font-nobel)",
                  }}
                >
                  {review.product}
                </span>
              </div>

              {/* Review text */}
              <p
                className="flex-1 text-xs leading-relaxed"
                style={{ color: "#666666", fontFamily: "var(--font-nobel)" }}
              >
                "{review.text}"
              </p>

              {/* Date */}
              <p
                className="mt-3 text-[10px]"
                style={{ color: "#BBBBBB", fontFamily: "var(--font-nobel)" }}
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
