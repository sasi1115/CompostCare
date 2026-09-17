/* =========================================================
   HOME 1 - IMPACT COUNTER ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const impactSection = document.querySelector(".home1-impact");
  const counters = document.querySelectorAll(".home1-impact-number");

  if (!impactSection || !counters.length) {
    return;
  }

  let counterStarted = false;

  const startCounters = () => {
    if (counterStarted) {
      return;
    }

    counterStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      const duration = 1800;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        /* Smooth ease-out effect */
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * easedProgress);

        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + "+";
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  /* =======================================================
     START WHEN SECTION ENTERS VIEWPORT
  ======================================================= */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(impactSection);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(impactSection);
});
/* =====================================================
   HOME 1 - TESTIMONIAL SLIDER
===================================================== */

const home1Testimonials = [
  {
    image: "../images/r2.jpg",
    text: "CompostCare made managing our kitchen waste so easy. The composting kit was simple to use, and we love seeing our waste turn into something useful for our garden.",
    name: "Priya Sharma",
    role: "Home Composting",
  },

  {
    image: "../images/r1.jpg",
    text: "“Managing household waste used to feel like a daily challenge, but CompostCare has made it much easier. The pickup service is reliable and convenient",
    name: "Rahul Mehta",
    role: "Community Member",
  },

  {
    image: "../images/r3.jpg",
    text: "The composting kit was very easy to use, and the compost has been wonderful for our garden. It is a simple way to make a positive difference every day.",
    name: "Ananya Reddy",
    role: "Home Gardener",
  },
];

/* =====================================================
   TESTIMONIAL ELEMENTS
===================================================== */

const testimonialImage = document.querySelector(".home1-testimonial-image img");

const testimonialText = document.querySelector(".home1-testimonial-text");

const testimonialName = document.querySelector(".home1-testimonial-name");

const testimonialRole = document.querySelector(".home1-testimonial-role");

const testimonialPrev = document.querySelector(".home1-testimonial-prev");

const testimonialNext = document.querySelector(".home1-testimonial-next");

/* =====================================================
   CURRENT TESTIMONIAL
===================================================== */

let currentTestimonial = 0;

/* =====================================================
   SHOW TESTIMONIAL
===================================================== */

function showHome1Testimonial(index) {
  const testimonial = home1Testimonials[index];

  if (!testimonial) {
    return;
  }

  testimonialImage.src = testimonial.image;
  testimonialImage.alt = testimonial.name;

  testimonialText.textContent = `“${testimonial.text}”`;

  testimonialName.textContent = testimonial.name;

  testimonialRole.textContent = testimonial.role;
}

/* =====================================================
   NEXT TESTIMONIAL
===================================================== */

if (testimonialNext) {
  testimonialNext.addEventListener("click", () => {
    currentTestimonial++;

    if (currentTestimonial >= home1Testimonials.length) {
      currentTestimonial = 0;
    }

    showHome1Testimonial(currentTestimonial);
  });
}

/* =====================================================
   PREVIOUS TESTIMONIAL
===================================================== */

if (testimonialPrev) {
  testimonialPrev.addEventListener("click", () => {
    currentTestimonial--;

    if (currentTestimonial < 0) {
      currentTestimonial = home1Testimonials.length - 1;
    }

    showHome1Testimonial(currentTestimonial);
  });
}

/* =====================================================
   INITIAL TESTIMONIAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  showHome1Testimonial(currentTestimonial);
});
