// ============================================
//  ArethmatPro — Math Formula Explorer
//  No chat, no API, no external services.
// ============================================

const $ = id => document.getElementById(id);

// ── State ──
let currentTopic = 'general';
let lightMode = false;

// ── Topic Labels ──
const topicLabels = {
    general: 'General Math', algebra: 'Algebra',
    geometry: 'Geometry', calculus: 'Calculus',
    statistics: 'Statistics', trigonometry: 'Trigonometry'
};

// ── Topic Icons ──
const topicIcons = {
    general: '🧮', algebra: '📐', geometry: '📏',
    calculus: '∫', statistics: '📊', trigonometry: '△'
};

// ── Topic Descriptions ──
const topicDesc = {
    general: 'Core arithmetic rules, number properties, and fundamental math concepts every learner should know.',
    algebra: 'Equations, expressions, and the art of solving for unknowns using variables and operations.',
    geometry: 'Shapes, areas, perimeters, volumes, and the relationships between angles and lines.',
    calculus: 'Limits, derivatives, integrals, and the mathematics of continuous change.',
    statistics: 'Data analysis, probability, distributions, and key measures of central tendency.',
    trigonometry: 'Angles, triangles, and the ratios that connect them — sine, cosine, and beyond.'
};

// ── Formula Data ──
const topicData = {
    general: {
        formulas: [
            { icon: '➕', title: 'Order of Operations (BODMAS)', expr: 'B → O → D → M → A → S', desc: 'Brackets, Orders (powers/roots), Division, Multiplication, Addition, Subtraction — solve in this order.', example: 'e.g. 3 + 4 × 2 = 3 + 8 = 11' },
            { icon: '📊', title: 'Percentage', expr: '(Part / Whole) × 100', desc: 'Convert a fraction to a percentage by dividing the part by the whole, then multiplying by 100.', example: 'e.g. 40 out of 200 = (40/200) × 100 = 20%' },
            { icon: '🔢', title: 'LCM — Least Common Multiple', expr: 'LCM(a,b) = (a × b) / GCD(a,b)', desc: 'The smallest number divisible by both a and b.', example: 'e.g. LCM(4, 6) = 24/2 = 12' },
            { icon: '🔣', title: 'GCD — Greatest Common Divisor', expr: 'GCD(a,b) — Euclidean Algorithm', desc: 'The largest number that divides both a and b without a remainder.', example: 'e.g. GCD(12, 8) = 4' },
            { icon: '🔗', title: 'Ratio & Proportion', expr: 'a/b = c/d  →  a×d = b×c', desc: 'Two ratios are proportional when their cross-products are equal.', example: 'e.g. 2/4 = 3/6 → 2×6 = 4×3 = 12 ✓' },
            { icon: '💰', title: 'Simple Interest', expr: 'SI = (P × R × T) / 100', desc: 'P = Principal, R = Rate (%), T = Time (years). Interest earned without compounding.', example: 'e.g. P=1000, R=5, T=2 → SI = 100' },
        ],
        facts: [
            { label: 'Even Number', value: 'n mod 2 = 0', note: 'Divisible by 2' },
            { label: 'Odd Number', value: 'n mod 2 = 1', note: 'Not divisible by 2' },
            { label: 'Prime', value: 'Divisors = 1 & n', note: 'e.g. 2, 3, 5, 7, 11' },
            { label: 'Perfect Square', value: '√n ∈ ℤ', note: 'e.g. 4, 9, 16, 25' },
        ]
    },
    algebra: {
        formulas: [
            { icon: '⚖️', title: 'Linear Equation', expr: 'ax + b = c  →  x = (c − b) / a', desc: 'Isolate x by performing the same operation on both sides of the equation.', example: 'e.g. 2x + 3 = 7 → x = (7−3)/2 = 2' },
            { icon: '🔺', title: 'Quadratic Formula', expr: 'x = (−b ± √(b²−4ac)) / 2a', desc: 'Solves ax² + bx + c = 0. The discriminant (b²−4ac) tells you the number of real roots.', example: 'e.g. x²−5x+6=0 → x=2 or x=3' },
            { icon: '📦', title: 'Difference of Squares', expr: 'a² − b² = (a+b)(a−b)', desc: 'A quick factoring identity when two perfect squares are subtracted.', example: 'e.g. x²−9 = (x+3)(x−3)' },
            { icon: '🔄', title: 'Perfect Square Trinomial', expr: '(a±b)² = a² ± 2ab + b²', desc: 'Expanding the square of a binomial always follows this pattern.', example: 'e.g. (x+3)² = x²+6x+9' },
            { icon: '📈', title: 'Slope of a Line', expr: 'm = (y₂−y₁) / (x₂−x₁)', desc: 'The slope describes how steep a line is — rise over run between two points.', example: 'e.g. (1,2) & (3,6) → m = 4/2 = 2' },
            { icon: '🗺️', title: 'Slope-Intercept Form', expr: 'y = mx + b', desc: 'm is the slope and b is the y-intercept (where the line crosses the y-axis).', example: 'e.g. y = 3x + 2' },
        ],
        facts: [
            { label: 'Zero Product', value: 'ab=0 → a=0 or b=0', note: 'Basis of factoring' },
            { label: 'Discriminant', value: 'D = b²−4ac', note: 'D>0: 2 roots, D=0: 1 root' },
            { label: 'Exponent Rule', value: 'aᵐ × aⁿ = aᵐ⁺ⁿ', note: 'Same base — add exponents' },
            { label: 'Negative Exponent', value: 'a⁻ⁿ = 1/aⁿ', note: 'Flip to make positive' },
        ]
    },
    geometry: {
        formulas: [
            { icon: '⬛', title: 'Area of a Rectangle', expr: 'A = length × width', desc: 'Multiply the two sides to get the total surface enclosed by the rectangle.', example: 'e.g. 5 × 3 = 15 sq units' },
            { icon: '🔺', title: 'Area of a Triangle', expr: 'A = ½ × base × height', desc: 'Half the base multiplied by the perpendicular height gives the area.', example: 'e.g. base=8, h=5 → A = 20' },
            { icon: '⭕', title: 'Area of a Circle', expr: 'A = π r²', desc: 'π ≈ 3.14159. Square the radius, then multiply by π.', example: 'e.g. r=7 → A ≈ 153.94' },
            { icon: '📐', title: 'Pythagorean Theorem', expr: 'a² + b² = c²', desc: 'For a right triangle, the sum of the squares of the two legs equals the square of the hypotenuse.', example: 'e.g. 3²+4²=5² → 9+16=25 ✓' },
            { icon: '🔵', title: 'Circumference of a Circle', expr: 'C = 2πr  or  C = πd', desc: 'The total distance around a circle. d is the diameter (d = 2r).', example: 'e.g. r=5 → C ≈ 31.42' },
            { icon: '📦', title: 'Volume of a Cuboid', expr: 'V = l × w × h', desc: 'Multiply length, width, and height to find the space inside a box.', example: 'e.g. 4×3×2 = 24 cubic units' },
        ],
        facts: [
            { label: 'Angles in Triangle', value: '∠A + ∠B + ∠C = 180°', note: 'Always sums to 180°' },
            { label: 'Right Angle', value: '90°', note: 'Marked with a small square' },
            { label: 'Supplementary', value: '∠A + ∠B = 180°', note: 'Angles on a straight line' },
            { label: 'π (Pi)', value: '≈ 3.14159', note: 'Ratio of C to diameter' },
        ]
    },
    calculus: {
        formulas: [
            { icon: '⟶', title: 'Definition of a Limit', expr: 'lim(x→a) f(x) = L', desc: 'As x approaches a, f(x) approaches L. The foundation of all calculus.', example: 'e.g. lim(x→2) x² = 4' },
            { icon: "f'", title: 'Derivative (Definition)', expr: "f'(x) = lim(h→0) [f(x+h)−f(x)] / h", desc: 'The instantaneous rate of change of f(x) at a point x.', example: 'Rate of change at a single point' },
            { icon: '⚡', title: 'Power Rule', expr: 'd/dx [xⁿ] = n·xⁿ⁻¹', desc: 'Bring the exponent to the front and reduce the power by 1. Fastest differentiation rule.', example: "e.g. d/dx[x³] = 3x²" },
            { icon: '🔗', title: 'Chain Rule', expr: 'd/dx[f(g(x))] = f\'(g(x))·g\'(x)', desc: 'To differentiate a composite function, differentiate the outer then multiply by the inner derivative.', example: "e.g. d/dx[sin(x²)] = cos(x²)·2x" },
            { icon: '∫', title: 'Basic Integration', expr: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', desc: 'Reverse of differentiation. Add 1 to the power and divide by the new power. Always add constant C.', example: 'e.g. ∫x² dx = x³/3 + C' },
            { icon: '📏', title: 'Fundamental Theorem', expr: '∫[a→b] f(x)dx = F(b) − F(a)', desc: 'The definite integral equals the antiderivative evaluated at the upper limit minus the lower limit.', example: 'Connects differentiation & integration' },
        ],
        facts: [
            { label: 'd/dx[sin x]', value: 'cos x', note: 'Trig derivative' },
            { label: 'd/dx[cos x]', value: '−sin x', note: 'Trig derivative' },
            { label: 'd/dx[eˣ]', value: 'eˣ', note: 'Self-derivative' },
            { label: 'd/dx[ln x]', value: '1/x', note: 'Log derivative' },
        ]
    },
    statistics: {
        formulas: [
            { icon: '📊', title: 'Mean (Average)', expr: 'x̄ = (Σx) / n', desc: 'Sum all values then divide by the count. The most common measure of center.', example: 'e.g. [2,4,6] → (12)/3 = 4' },
            { icon: '📍', title: 'Median', expr: 'Middle value when sorted', desc: 'Sort the data. If odd count → middle value. If even → average of two middle values.', example: 'e.g. [1,3,5] → median = 3' },
            { icon: '🏆', title: 'Mode', expr: 'Most frequent value', desc: 'The value that appears most often in a dataset. A dataset can have multiple modes.', example: 'e.g. [2,3,3,5] → mode = 3' },
            { icon: '📐', title: 'Standard Deviation', expr: 'σ = √[Σ(x−x̄)² / n]', desc: 'Measures how spread out the data is from the mean. Low σ = data clustered tightly.', example: 'Higher σ = more spread' },
            { icon: '🎲', title: 'Probability', expr: 'P(A) = Favourable / Total', desc: 'The likelihood of an event occurring. Always a value between 0 (impossible) and 1 (certain).', example: 'e.g. P(heads) = 1/2 = 0.5' },
            { icon: '🔄', title: "Bayes' Theorem", expr: 'P(A|B) = P(B|A)·P(A) / P(B)', desc: 'Updates the probability of A given new evidence B. The core of conditional probability.', example: 'Used in spam filters, medical tests' },
        ],
        facts: [
            { label: 'Range', value: 'Max − Min', note: 'Simplest spread measure' },
            { label: 'Variance', value: 'σ²', note: 'Square of std deviation' },
            { label: 'P(A or B)', value: 'P(A)+P(B)−P(A∩B)', note: 'Addition rule' },
            { label: 'P(A and B)', value: 'P(A)·P(B)', note: 'If A, B independent' },
        ]
    },
    trigonometry: {
        formulas: [
            { icon: '📐', title: 'SOH-CAH-TOA', expr: 'sin=O/H  cos=A/H  tan=O/A', desc: 'The three primary trig ratios for a right triangle. O=Opposite, A=Adjacent, H=Hypotenuse.', example: 'The golden rule of trig' },
            { icon: '🔄', title: 'Pythagorean Identity', expr: 'sin²θ + cos²θ = 1', desc: 'The fundamental trig identity — always true for any angle θ. Derived from Pythagoras.', example: 'e.g. sin²30°+cos²30°=1 ✓' },
            { icon: '2️⃣', title: 'Double Angle — Sine', expr: 'sin(2θ) = 2 sin θ cos θ', desc: 'Expands sine of double an angle into a product of sine and cosine.', example: 'e.g. sin(60°) = 2·sin30°·cos30°' },
            { icon: '🔃', title: 'Double Angle — Cosine', expr: 'cos(2θ) = cos²θ − sin²θ', desc: 'Also written as 2cos²θ−1 or 1−2sin²θ. Three equivalent forms.', example: 'Choose the most useful form' },
            { icon: '📏', title: 'Sine Rule', expr: 'a/sinA = b/sinB = c/sinC', desc: 'Relates each side of a triangle to the sine of its opposite angle. Works for any triangle.', example: 'Use when 2 angles + 1 side known' },
            { icon: '📐', title: 'Cosine Rule', expr: 'c² = a² + b² − 2ab·cos C', desc: 'Generalizes the Pythagorean theorem to any triangle. Use when 2 sides + included angle known.', example: 'Reduces to Pythagoras when C=90°' },
        ],
        facts: [
            { label: 'sin 0°', value: '0', note: 'sin 90° = 1' },
            { label: 'cos 0°', value: '1', note: 'cos 90° = 0' },
            { label: 'tan 45°', value: '1', note: 'tan 0° = 0' },
            { label: 'sin 30°', value: '0.5', note: 'cos 60° = 0.5' },
        ]
    }
};

// ── Render Topic Content ──
function renderTopic(topic) {
    const area = $('contentArea');
    const data = topicData[topic];
    const label = topicLabels[topic];

    let delay = 0;
    const cardDelay = () => { delay += 60; return delay; };

    const formulaCards = data.formulas.map(f => `
    <div class="formula-card" style="animation-delay:${cardDelay()}ms">
      <div class="formula-card-header">
        <span class="formula-card-icon">${f.icon}</span>
        <span class="formula-card-title">${f.title}</span>
      </div>
      <div class="formula-expr">${f.expr}</div>
      <div class="formula-desc">${f.desc}</div>
      <div class="formula-example">${f.example}</div>
    </div>
  `).join('');

    const factCards = data.facts.map(f => `
    <div class="key-fact" style="animation-delay:${cardDelay()}ms">
      <div class="key-fact-label">${f.label}</div>
      <div class="key-fact-value">${f.value}</div>
      <div class="key-fact-note">${f.note}</div>
    </div>
  `).join('');

    area.innerHTML = `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        <div class="topic-hero-icon">${topicIcons[topic]}</div>
        <h1 class="topic-hero-title">${label}</h1>
      </div>
      <p class="topic-hero-desc">${topicDesc[topic]}</p>
    </div>

    <div class="section-title">Key Formulas</div>
    <div class="formula-grid">${formulaCards}</div>

    <div class="section-title">Quick Reference</div>
    <div class="key-facts">${factCards}</div>
  `;

    // Scroll to top on topic change
    area.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Topic Navigation ──
document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTopic = btn.dataset.topic;
        $('currentTopicLabel').textContent = topicLabels[currentTopic];
        renderTopic(currentTopic);
        closeSidebar();
    });
});

// ── Theme Toggle ──
$('themeToggleBtn').addEventListener('click', () => {
    lightMode = !lightMode;
    document.body.classList.toggle('light-mode', lightMode);
    const icon = $('themeIcon');
    icon.innerHTML = lightMode
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
        : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
});

// ── Mobile Sidebar ──
const sidebar = $('sidebar');
const mobileOverlay = $('mobileOverlay');

$('mobileMenuBtn').addEventListener('click', () => {
    sidebar.classList.add('open');
    mobileOverlay.classList.add('visible');
});
mobileOverlay.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.classList.remove('open');
    mobileOverlay.classList.remove('visible');
}


// ── Init ──
renderTopic(currentTopic);

// ── Botpress Chatbot Popup (Permanent) ──
(function () {
    const popup = $('bpPopup');
    const closeBtn = $('bpPopupClose');

    // Show popup after a brief 1.5s delay (lets the page settle first)
    setTimeout(() => {
        popup.classList.add('visible');
    }, 1500);

    // Close button hides for this page view only — reappears on reload
    closeBtn.addEventListener('click', () => {
        popup.classList.add('hiding');
        popup.classList.remove('visible');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 450);
    });
})();
