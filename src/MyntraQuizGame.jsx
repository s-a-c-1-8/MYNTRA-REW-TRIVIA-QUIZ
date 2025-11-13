import React, { useState, useEffect, useRef } from "react";
import "./MyntraQuizGame.css";
import { supabase } from "./supabaseClient";

/* ---------- Game data (trivia + images) ---------- */
const TRIVIA_QUESTIONS = [
  {
    id: 1,
    q: "What is the official name of our Pickleball court?",
    options: ["MynMaidan", "Pickleball Court", "Dhyana Kaksa", "Active Arena"],
    answerIndex: 0,
  },
  {
    id: 2,
    q: "Which option correctly lists three of the new activities introduced for the 2025 Myntra Olympics and MynTunes?",
    options: [
      "Cricket, MynOlympian, and Swimming.",
      "MynOlympian, Pickleball, and Chess.",
      "Swimming, Stepathon, and Painting.",
      "Pickleball, Chess, and Cricket.",
    ],
    answerIndex: 1,
  },
  {
    id: 3,
    q: "If the food quality is an issue (for example, the daal is undersalted), which committee or resource should you contact?",
    options: [
      "Jam Room Committee",
      "Food Committee",
      "Transport Committee",
      "REW Helpdesk",
    ],
    answerIndex: 1,
  },
  {
    id: 4,
    q: "What is the maximum distance boundary (in kilometers) for utilizing the shuttle transport service?",
    options: [
      "20 kms",
      "25 kms",
      "40 kms",
      "Within municipal limits of Bangalore",
    ],
    answerIndex: 0,
  },
  {
    id: 5,
    q: "Does the company policy permit employees to bring their children to the workplace during regular working hours?",
    options: ["Yes", "No"],
    answerIndex: 0,
  },
  {
    id: 6,
    q: "Are the plants currently found inside the Myntra campus natural, artificial, or a combination of both?",
    options: ["Natural", "Artificial", "Both", "Neither"],
    answerIndex: 2,
  },
  {
    id: 7,
    q: "According to company policy, are female employees provided with cab service after 8:00 PM?",
    options: ["Yes", "No"],
    answerIndex: 0,
  },
  {
    id: 8,
    q: "What is the percentage discount you receive at TBC (The Be Continued) upon presenting your Myntra ID card?",
    options: ["5%", "10%", "15%", "20%"],
    answerIndex: 1,
  },
  {
    id: 9,
    q: "If utilizing the corporate Mailroom Services, are employees permitted to send personal couriers, and if so, how is the payment processed?",
    options: ["Yes, with pay debit.", "No, personal couriers are not allowed."],
    answerIndex: 0,
  },
  {
    id: 10,
    q: "Are shower rooms available on every floor for use after a workout at the gym?",
    options: [
      "Yes, they are available on all floors.",
      "No, they are available only on every alternate floor.",
    ],
    answerIndex: 0,
  },
  {
    id: 11,
    q: "On which floor is the Mother's Room located?",
    options: [
      "Inside the Crèche at Ground Floor (GF)",
      "6th Floor",
      "4th Floor",
      "3rd Floor",
    ],
    answerIndex: 0,
  },
  {
    id: 12,
    q: "On which floor(s) are the nap pods available for employee use?",
    options: [
      "2nd floor, 3rd floor, 4th floor & 5th floor",
      "1st floor, 2nd floor, 3rd floor & 5th floor",
      "All floors",
      "None",
    ],
    answerIndex: 0,
  },
  {
    id: 13,
    q: "According to the company travel policy, what is the minimum number of days prior to the domestic travel date that the request must be submitted?",
    options: ["20 days", "15 days", "25 days", "10 days"],
    answerIndex: 1,
  },
  {
    id: 14,
    q: "Which action is the correct procedure to follow immediately upon hearing the alarm during a fire drill?",
    options: [
      "Follow the evacuation route calmly.",
      "Continue your meeting.",
      "Run in panic.",
      "Wait for instructions from a friend.",
    ],
    answerIndex: 0,
  },
  {
    id: 15,
    q: "In the event of an emergency evacuation, where is the official safe assembly area?",
    options: [
      "Adjoining MynMaidan",
      "Near Hatti Café",
      "At Reception",
      "Basement 2",
    ],
    answerIndex: 0,
  },
  {
    id: 16,
    q: "Where is the designated fire refuge area located within our campus building?",
    options: ["All floors", "None of the floors", "Ground Floor", "4th Floor"],
    answerIndex: 2,
  },
  {
    id: 17,
    q: "What is the longest available tenure (in months) for the employee car lease program?",
    options: ["60 months", "72 months", "84 months", "96 months"],
    answerIndex: 2,
  },
  {
    id: 18,
    q: "On which floor of the campus can employees access an ATM?",
    options: ["At 6th floor", "At 2nd floor", "At Ground floor", "In Basement"],
    answerIndex: 2,
  },
  {
    id: 19,
    q: "What is the official procedure for reserving MynMaidan?",
    options: [
      "First come, first served",
      "Request other players to vacate",
      "Do not book; just drop by",
      "Book through Yoda Ticket",
    ],
    answerIndex: 3,
  },
  {
    id: 20,
    q: "Which of the following activities are permitted or encouraged inside the Dhyana Kaksa?",
    options: [
      "Deep breathing",
      "Guided meditation",
      "Quiet sitting / reflection",
      "All of the above",
    ],
    answerIndex: 3,
  },
  {
    id: 21,
    q: "Which of the following recently added options is categorized as a healthy snacks available in the floor pantry?",
    options: [
      "Aloo Bhujia",
      "Moong Dal Mixture",
      "Millet Namkeen & Raagi cookie",
      "None of the above",
    ],
    answerIndex: 2,
  },
  {
    id: 22,
    q: "What is the current status of solar power generation on the building terrace?",
    options: [
      "Yes, solar power generation is currently active there.",
      "No, it is not installed and is not planned.",
      "Planning to install solar power generation soon.",
      "Solar power generation is not feasible for that location.",
    ],
    answerIndex: 0,
  },
  {
    id: 23,
    q: "What percentage of our campus is currently powered by green energy?",
    options: ["100%", "75%", "65%", "40%"],
    answerIndex: 2,
  },
  {
    id: 24,
    q: "What is the employee payment structure for charging an electric vehicle (EV) on campus?",
    options: [
      "₹500 monthly fee",
      "₹700 monthly fee",
      "There are currently no charges (free of cost)",
      "Pay based on actual usage",
    ],
    answerIndex: 3,
  },
  {
    id: 25,
    q: "On which floor of the Myntra Bangalore office is the largest auditorium (Audi room) situated?",
    options: ["Ground Floor", "2nd Floor", "3rd Floor", "5th Floor"],
    answerIndex: 2,
  },
  {
    id: 26,
    q: "Advantages of tickets getting booked from CT",
    options: [
      "Free Meal, Free Seat & Minimal cancellation charges",
      "No benefits",
      "Free meal only",
      "Better than retail rates",
    ],
    answerIndex: 0,
  },
];

const IMAGE_QUESTIONS = [
  {
    id: 1,
    label: "Mailroom",
    src: "/images/mailroom.jpg",
    revealSrc: "/images/mailroom-reveal.jpg",
  },
  {
    id: 2,
    label: "Gym",
    src: "/images/gym.jpg",
    revealSrc: "/images/gym-reveal.jpg",
  },
  {
    id: 3,
    label: "Mother Room",
    src: "/images/motherroom.jpg",
    revealSrc: "/images/motherroom-reveal.jpg",
  },
  {
    id: 4,
    label: "Nap Pods",
    src: "/images/nappods.jpg",
    revealSrc: "/images/nappods-reveal.jpg",
  },
  {
    id: 5,
    label: "Fire Drill",
    src: "/images/firedrill.jpg",
    revealSrc: "/images/firedrill-reveal.jpg",
  },
  {
    id: 6,
    label: "ATM",
    src: "/images/atm.jpg",
    revealSrc: "/images/atm-reveal.jpg",
  },
  {
    id: 7,
    label: "MynMaidan",
    src: "/images/mynmaidan.jpg",
    revealSrc: "/images/mynmaidan-reveal.jpg",
  },
  {
    id: 8,
    label: "Dhyana Kaksa",
    src: "/images/dhyana.jpg",
    revealSrc: "/images/dhyana-reveal.jpg",
  },
  {
    id: 9,
    label: "Pantry",
    src: "/images/pantry.jpg",
    revealSrc: "/images/pantry-reveal.jpg",
  },
  {
    id: 10,
    label: "EV Charging Station",
    src: "/images/ev.jpg",
    revealSrc: "/images/ev-reveal.jpg",
  },
  {
    id: 11,
    label: "5th Floor Audi",
    src: "/images/audi5.jpg",
    revealSrc: "/images/audi5-reveal.jpg",
  },
];

const NUM_ROUNDS = 1;
const TOTAL_QUESTIONS = 5; // 1 image + 4 trivia
const GAME_TIME = 30; // 30 seconds timer

/* ---------- Helpers ---------- */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomQuestions(count) {
  const shuffled = shuffleArray([...TRIVIA_QUESTIONS]);
  return shuffled.slice(0, count);
}

function buildRounds(triviaCount, imageCount, rounds = NUM_ROUNDS) {
  const selectedTrivia = getRandomQuestions(triviaCount);
  const triviaIndices = selectedTrivia.map((_, index) => index);
  const imageIndices = shuffleArray(
    Array.from({ length: imageCount }, (_, i) => i)
  );

  const result = [];
  let tPtr = 0,
    iPtr = 0;

  for (let r = 0; r < rounds; r++) {
    if (tPtr + 4 >= triviaIndices.length) {
      // Reset if we run out of trivia questions
      const moreTrivia = getRandomQuestions(triviaCount);
      selectedTrivia.push(...moreTrivia);
      triviaIndices.push(
        ...Array.from(
          { length: moreTrivia.length },
          (_, i) => triviaIndices.length + i
        )
      );
    }

    const t1 = triviaIndices[tPtr++];
    const t2 = triviaIndices[tPtr++];
    const t3 = triviaIndices[tPtr++];
    const t4 = triviaIndices[tPtr++];

    if (iPtr >= imageIndices.length) {
      imageIndices.push(
        ...shuffleArray(Array.from({ length: imageCount }, (_, i) => i))
      );
    }

    const im = imageIndices[iPtr++];
    result.push({
      trivia: [t1, t2, t3, t4],
      image: im,
      triviaQuestions: selectedTrivia,
    });
  }

  return result;
}

/* ---------- Logo Component ---------- */
function GameLogos() {
  return (
    <div className="game-logos">
      <div className="logo-left">
        <img
          src="/Logo-2.png"
          alt="Myntra Logo"
          className="logo-image"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="logo-fallback" style={{ display: "none" }}>
          <span>MYNTRA</span>
        </div>
      </div>
      {/* <div className="logo-center">
        <h1 className="center-title">Know Your Facilities</h1>
      </div> */}
      <div className="logo-right">
        <img
          src="/Logo-1.png"
          alt="Myntra Olympics"
          className="logo-image"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="logo-fallback" style={{ display: "none" }}>
          <span>OLYMPICS</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Timer Component ---------- */
function Timer({ timeLeft }) {
  return (
    <div className="timer-container">
      <div className="timer-number-large">{timeLeft}</div>
      <div className="timer-label">SECONDS LEFT</div>
    </div>
  );
}

/* ---------- UI subcomponents ---------- */
function StartForm({ onStart }) {
  const [name, setName] = useState("");
  const [showRules, setShowRules] = useState(false);
  return (
    <div className="mq-container start-screen">
      <GameLogos />
      <div className="mq-form">
        <div className="mq-header-logo">
          <div className="mq-main-title">
            <div className="logo-center">
              <h1 className="center-title">Know Your Facilities</h1>
            </div>
            {/* Ready to prove you're a true
            <img
              style={{ width: "40px", height: "auto", marginBottom: "-8px" }}
              src="/Logo-2.png"
              alt="Myntra Logo"
              className="logo-image"
            />
            expert? */}
          </div>
        </div>
        <div className="mq-input-row">
          <input
            className="mq-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name here..."
          />
        </div>
        <div className="mq-start-action">
          <button
            className="mq-btn primary start-btn"
            onClick={() => onStart(name || "Player")}
            disabled={!name.trim()}
          >
            🚀 Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

/* Trivia card — only selected state (no correct/incorrect coloring) */
function TriviaCard({ question, onAnswer, disabled, selectedAnswer }) {
  if (!question) return null;
  return (
    <div className="mq-card trivia-card">
      <div className="mq-question-count">Trivia Question</div>
      <div className="mq-question">{question.q}</div>
      <div className="mq-options">
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          const cls = isSelected ? "mq-option selected" : "mq-option";
          return (
            <button
              key={idx}
              className={cls}
              aria-disabled={disabled}
              disabled={disabled}
              title={opt}
              onClick={() => onAnswer(idx)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ImageCard — options also only show selected state */
function ImageCard({
  imageObj,
  roundZoom,
  onChoose,
  options,
  disabled,
  selectedAnswer,
  showReveal,
  correctAnswer,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [revealImageLoaded, setRevealImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setRevealImageLoaded(false);
  }, [imageObj]);

  // Use reveal image when showReveal is true, otherwise use normal image
  const currentImageSrc = showReveal
    ? imageObj?.revealSrc || imageObj?.src
    : imageObj?.src;

  return (
    <div className="mq-card image-card">
      <div className="mq-question-count">
        {showReveal ? "Image Reveal!" : "Identify the Image"}
      </div>
      <div className="image-card-content">
        <div className="image-side">
          <div className="mq-image-container">
            <div className="mq-image-box">
              {!imageLoaded && !imageError && !showReveal && (
                <div className="image-skeleton-loading">
                  <div className="skeleton-spinner"></div>
                  <div className="skeleton-text">Loading image...</div>
                </div>
              )}

              {!revealImageLoaded && !imageError && showReveal && (
                <div className="image-skeleton-loading">
                  <div className="skeleton-spinner"></div>
                  <div className="skeleton-text">Loading reveal image...</div>
                </div>
              )}

              {currentImageSrc ? (
                <img
                  src={currentImageSrc}
                  alt={imageObj.label}
                  className={`image-view ${
                    roundZoom === 1
                      ? "zoom-10"
                      : showReveal
                      ? "zoom-100"
                      : "zoom-30"
                  } ${
                    (showReveal ? revealImageLoaded : imageLoaded)
                      ? "loaded"
                      : "loading"
                  }`}
                  onLoad={() => {
                    if (showReveal) {
                      setRevealImageLoaded(true);
                    } else {
                      setImageLoaded(true);
                    }
                  }}
                  onError={() => {
                    setImageError(true);
                    if (showReveal) {
                      setRevealImageLoaded(true);
                    } else {
                      setImageLoaded(true);
                    }
                  }}
                  style={{
                    objectFit: "cover",
                    display:
                      (showReveal ? revealImageLoaded : imageLoaded) &&
                      !imageError
                        ? "block"
                        : "none",
                  }}
                />
              ) : null}

              {imageError && (
                <div className="mq-image-fallback">
                  <div className="image-placeholder">🏢</div>
                  <div className="image-error-text">Image not available</div>
                  <div className="image-label-preview">{imageObj?.label}</div>
                </div>
              )}
            </div>
            <div className="image-hint">
              {showReveal ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                  ✅ This is: {correctAnswer}
                </span>
              ) : roundZoom === 1 ? (
                "🔍 Look carefully at the details!"
              ) : (
                "👀 Second chance with more visible!"
              )}
            </div>
          </div>
        </div>

        {!showReveal && (
          <div className="options-side">
            <div className="mq-options">
              {options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const cls = isSelected ? "mq-option selected" : "mq-option";
                return (
                  <button
                    key={i}
                    className={cls}
                    aria-disabled={disabled}
                    disabled={disabled}
                    title={opt}
                    onClick={() => onChoose(opt)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="option-text">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* FinalScore left as-is */
function FinalScore({ playerName, score, onPlayAgain }) {
  const getPerformanceMessage = () => {
    if (score >= 120) return { message: "🏆 Champion! 🏆", color: "#FFD700" };
    if (score >= 90) return { message: "🎯 Excellent!", color: "#4CAF50" };
    if (score >= 60) return { message: "👍 Great Job!", color: "#2196F3" };
    if (score >= 30) return { message: "💪 Good Effort!", color: "#FF9800" };
    return { message: "🌟 Keep Learning!", color: "#9C27B0" };
  };
  const performance = getPerformanceMessage();
  return (
    <div className="mq-container final-screen">
      <GameLogos />
      <div className="mq-form">
        <div className="mq-header-logo">
          <h1 className="mq-title">Game Completed! 🎉</h1>
        </div>
        <div className="mq-final-score">
          <div className="final-score-card">
            <div className="final-player">
              <strong>{playerName.toUpperCase()}</strong>
            </div>
            <div className="final-points" style={{ color: performance.color }}>
              {score} Points
            </div>
            <div
              className="mq-performance"
              style={{ backgroundColor: performance.color }}
            >
              {performance.message}
            </div>
          </div>
        </div>
        <div className="mq-actions">
          <button className="mq-btn primary home-btn" onClick={onPlayAgain}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Component (with toast) ---------- */
export default function MyntraQuizGame() {
  const [playerName, setPlayerName] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionPointer, setQuestionPointer] = useState(0);
  const [imageRoundZoom, setImageRoundZoom] = useState(1);
  const [imageOptions, setImageOptions] = useState([]);
  const [disabledAnswers, setDisabledAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [showImageReveal, setShowImageReveal] = useState(false);
  const [imageAttempts, setImageAttempts] = useState(0);

  // toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    setRounds(
      buildRounds(4, IMAGE_QUESTIONS.length, NUM_ROUNDS) // 4 trivia questions + 1 image
    );
  }, []);

  useEffect(() => {
    setQuestionPointer(0);
    setImageRoundZoom(1);
    setSelectedAnswer(null);
    setDisabledAnswers(false);
    setShowImageReveal(false);
    setImageAttempts(0);
  }, [currentRoundIndex]);

  useEffect(() => {
    if (!rounds || rounds.length === 0) return;

    // Image question now comes first (questionPointer 0)
    if (questionPointer === 0) {
      const currentRound = rounds[currentRoundIndex];
      if (!currentRound) return;
      const imageGlobalIndex = currentRound.image;
      const imageObjForOptions = IMAGE_QUESTIONS[imageGlobalIndex];
      if (!imageObjForOptions) return;
      const opts = generateImageOptions(imageObjForOptions.label);
      setImageOptions(opts);
    }
  }, [questionPointer, currentRoundIndex, rounds]);

  // Timer effect
  useEffect(() => {
    if (!playerName || gameFinished || timeLeft <= 0 || showImageReveal) return;

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, playerName, gameFinished, showImageReveal]);

  // Time up effect
  useEffect(() => {
    if (timeLeft <= 0 && !gameFinished) {
      handleTimeUp();
    }
  }, [timeLeft, gameFinished]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  function showToast(message, type = "info", duration = 1000) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message, type });
    toastTimerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      duration
    );
  }

  function startGame(name) {
    setPlayerName(name);
    setScore(0);
    setCurrentRoundIndex(0);
    setGameFinished(false);
    setQuestionPointer(0);
    setImageRoundZoom(1);
    setTimeLeft(GAME_TIME);
    setShowImageReveal(false);
    setImageAttempts(0);
    setRounds(
      buildRounds(4, IMAGE_QUESTIONS.length, NUM_ROUNDS) // 4 trivia + 1 image
    );
  }

  function getCurrentRound() {
    return rounds[currentRoundIndex];
  }

  // Function to save score (placeholder for API integration)
  async function saveScoreToAPI(name, finalScore) {
    try {
      const { data, error } = await supabase
        .from("trivia-quiz_scores")
        .insert([{ name, score: finalScore }]);

      if (error) {
        console.error("❌ Supabase error:", error);
      } else {
        console.log("✅ Score saved:", data);
      }
    } catch (err) {
      console.error("Error saving score:", err);
    }
  }

  function handleTimeUp() {
    setDisabledAnswers(true);
    showToast("⏰ Time's up! Game over", "error", 3000);
    setTimeout(() => {
      setGameFinished(true);
      // Here you can add API call to save score
      saveScoreToAPI(playerName, score);
    }, 2000);
  }

  function handleTriviaAnswer(selectedIndex) {
    const round = getCurrentRound();
    if (!round) return;

    // Adjust index since image is now first (questionPointer 0)
    const triviaIndex = questionPointer - 1; // Because image is at position 0
    const triviaGlobalIndex = round.trivia[triviaIndex];
    const questionObj = round.triviaQuestions[triviaGlobalIndex];
    const correct = selectedIndex === questionObj.answerIndex;
    const delta = correct ? 30 : -10;

    // selected state while toast shows
    setSelectedAnswer(selectedIndex);
    setDisabledAnswers(true);

    // show toast
    if (correct) showToast("✅ Correct! +30 points", "success");
    else showToast("❌ Incorrect! -10 points", "error");

    // apply score and advance after a small delay
    setTimeout(() => {
      setScore((s) => Math.max(0, s + delta)); // Ensure score doesn't go below 0
      setTimeout(() => {
        setSelectedAnswer(null);
        setDisabledAnswers(false);
        if (questionPointer < TOTAL_QUESTIONS - 1) {
          setQuestionPointer((p) => p + 1);
        } else {
          setGameFinished(true);
          // Here you can add API call to save score
          saveScoreToAPI(playerName, score + delta);
        }
      }, 700);
    }, 600);
  }

  function generateImageOptions(correctLabel) {
    const labels = IMAGE_QUESTIONS.map((i) => i.label);
    const pool = labels.filter((l) => l !== correctLabel);
    const shuffled = shuffleArray(pool).slice(0, 3);
    const options = shuffleArray([correctLabel, ...shuffled]);
    return options;
  }

  function handleImageReveal() {
    setShowImageReveal(true);
    setDisabledAnswers(true);

    // Show the revealed image for 2 seconds then move to next question
    setTimeout(() => {
      setShowImageReveal(false);
      setSelectedAnswer(null);
      setDisabledAnswers(false);
      setQuestionPointer(1); // Move to first trivia question
    }, 5000);
  }

  function handleImageChoice(choice) {
    const round = getCurrentRound();
    if (!round) return;
    const imageGlobalIndex = round.image;
    const imageObj = IMAGE_QUESTIONS[imageGlobalIndex];
    const correct = choice === imageObj.label;

    setSelectedAnswer(choice);
    setDisabledAnswers(true);
    setImageAttempts((prev) => prev + 1);

    if (imageRoundZoom === 1) {
      // 🥇 First attempt
      if (correct) {
        showToast("🎉 Perfect! +30 points", "celebrate");
        setTimeout(() => setScore((s) => s + 30), 500);
        setTimeout(() => {
          setImageRoundZoom(0);
          handleImageReveal(); // 👈 show reveal first
          // wait 2 seconds (for reveal display), then continue
          setTimeout(() => {
            setSelectedAnswer(null);
            setDisabledAnswers(false);
            setQuestionPointer(1); // move to trivia after reveal
          }, 2000);
        }, 800);
      } else {
        showToast("❌ Incorrect — Second try unlocked", "error");
        setTimeout(() => {
          setImageRoundZoom(2);
          setSelectedAnswer(null);
          setDisabledAnswers(false);
        }, 700);
      }
    } else {
      // 🥈 Second attempt
      if (correct) {
        showToast("✅ Correct! +30 points", "success");
        setTimeout(() => setScore((s) => s + 30), 500);
        setTimeout(() => {
          handleImageReveal(); // 👈 show reveal first
          // wait 2 seconds (for reveal display), then continue
          setTimeout(() => {
            setSelectedAnswer(null);
            setDisabledAnswers(false);
            setQuestionPointer(1); // move to trivia after reveal
          }, 2000);
        }, 800);
      } else {
        // ❌ Both attempts failed
        showToast("❌ Incorrect — Revealing the answer", "error");
        setTimeout(() => {
          handleImageReveal();
        }, 700);
      }
    }
  }

  function handlePlayAgain() {
    setPlayerName(null);
    setScore(0);
    setCurrentRoundIndex(0);
    setQuestionPointer(0);
    setImageRoundZoom(1);
    setGameFinished(false);
    setDisabledAnswers(false);
    setSelectedAnswer(null);
    setTimeLeft(GAME_TIME);
    setShowImageReveal(false);
    setImageAttempts(0);
    setRounds(buildRounds(4, IMAGE_QUESTIONS.length, NUM_ROUNDS));
  }

  /* ---------- Render ---------- */
  if (gameFinished) {
    return (
      <FinalScore
        playerName={playerName}
        score={score}
        onPlayAgain={handlePlayAgain}
      />
    );
  }
  if (!playerName) {
    return <StartForm onStart={startGame} />;
  }

  const round = getCurrentRound();
  const triviaObj1 = round ? round.triviaQuestions[round.trivia[0]] : null;
  const triviaObj2 = round ? round.triviaQuestions[round.trivia[1]] : null;
  const triviaObj3 = round ? round.triviaQuestions[round.trivia[2]] : null;
  const triviaObj4 = round ? round.triviaQuestions[round.trivia[3]] : null;
  const imageObj = round ? IMAGE_QUESTIONS[round.image] : null;
  const questionNumber = questionPointer + 1;

  return (
    <div className="mq-container game-screen">
      {/* Top-center toast */}
      <div className="mq-toast-wrap" aria-live="polite">
        <div
          className={`mq-toast ${toast.type} ${toast.visible ? "visible" : ""}`}
          role="status"
          aria-hidden={!toast.visible}
        >
          <span className="icon">
            {toast.type === "success"
              ? "✅"
              : toast.type === "error"
              ? "❌"
              : toast.type === "celebrate"
              ? "🎉"
              : "ℹ️"}
          </span>
          <span>{toast.message}</span>
        </div>
      </div>

      {/* Logos */}
      <GameLogos />

      {/* Game Header - Updated layout */}
      <div className="mq-game-header">
        <div className="player-section">
          <div className="player-info">
            <div className="player-name">{playerName.toUpperCase()}</div>
            <div className="player-status">PLAYING NOW</div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-text">
            Question {questionNumber} of {TOTAL_QUESTIONS}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(questionNumber / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>

        <div className="stats-section">
          <div className="score-display-large">
            <div className="score-value-large">{score}</div>
            <div className="score-label">SCORE</div>
          </div>

          <div className="timer-display-large">
            <div className="timer-number-large">{timeLeft}</div>
            <div className="timer-label">SECONDS LEFT</div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="mq-game-content">
        {/* Image question comes first (questionPointer 0) */}
        {questionPointer === 0 && imageObj && (
          <ImageCard
            imageObj={imageObj}
            roundZoom={imageRoundZoom}
            options={imageOptions}
            onChoose={handleImageChoice}
            disabled={disabledAnswers || timeLeft <= 0}
            selectedAnswer={selectedAnswer}
            showReveal={showImageReveal}
            correctAnswer={imageObj?.label}
          />
        )}

        {/* Trivia questions follow (questionPointer 1, 2, 3, 4) */}
        {questionPointer === 1 && triviaObj1 && (
          <TriviaCard
            question={triviaObj1}
            onAnswer={handleTriviaAnswer}
            disabled={disabledAnswers || timeLeft <= 0}
            selectedAnswer={selectedAnswer}
          />
        )}
        {questionPointer === 2 && triviaObj2 && (
          <TriviaCard
            question={triviaObj2}
            onAnswer={handleTriviaAnswer}
            disabled={disabledAnswers || timeLeft <= 0}
            selectedAnswer={selectedAnswer}
          />
        )}
        {questionPointer === 3 && triviaObj3 && (
          <TriviaCard
            question={triviaObj3}
            onAnswer={handleTriviaAnswer}
            disabled={disabledAnswers || timeLeft <= 0}
            selectedAnswer={selectedAnswer}
          />
        )}
        {questionPointer === 4 && triviaObj4 && (
          <TriviaCard
            question={triviaObj4}
            onAnswer={handleTriviaAnswer}
            disabled={disabledAnswers || timeLeft <= 0}
            selectedAnswer={selectedAnswer}
          />
        )}
      </div>
    </div>
  );
}
