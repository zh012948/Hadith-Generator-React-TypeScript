import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

interface HadithData {
  hadith_english: string;
  header: string;
}

const HadithGenerator: React.FC = () => {
  const [hadith, setHadith] = useState<string>(
    'Click on the "New Hadith" button.'
  );
  const [narrator, setNarrator] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  // Fetch Hadith from API
  const fetchHadith = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://random-hadith-generator.vercel.app/bukhari/"
      );
      const data: HadithData = response.data.data;
      setHadith(data.hadith_english);
      setNarrator(data.header);
    } catch (error) {
      console.error("Error fetching Hadith:", error);
      setHadith("Failed to load Hadith. Try again.");
      setNarrator("");
    } finally {
      setLoading(false);
    }
  };

  // Play Hadith voice
  const playHadith = () => {
    if (!speech) {
      const utterance = new SpeechSynthesisUtterance(hadith);
      utterance.onend = () => setSpeech(null);
      setSpeech(utterance);
      speechSynthesis.speak(utterance);
    }
  };

  // Stop Hadith voice
  const stopHadith = () => {
    if (speech) {
      speechSynthesis.cancel();
      setSpeech(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-300 p-4">
      <div className="w-full max-w-xl bg-gray-200 p-8 rounded-xl shadow-lg text-center">
        {/* Header */}
        <header className="text-3xl font-bold mb-6">Hadith of the Day</header>

        {/* Narrator */}
        {narrator && (
          <span className="block mb-4 font-medium text-gray-700">{narrator}</span>
        )}

        {/* Hadith content */}
        <p className="mb-6 text-xl font-sans">{hadith}</p>

        {/* Voice controls */}
        <div className="flex items-center justify-center gap-6 mb-6 text-2xl">
          <button
            onClick={playHadith}
            className="text-purple-700 hover:text-purple-900 transition-colors"
            aria-label="Play Hadith"
          >
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
          <button
            onClick={stopHadith}
            className="text-purple-700 hover:text-purple-900 transition-colors"
            aria-label="Stop Hadith"
          >
            <FontAwesomeIcon icon={faVolumeXmark} />
          </button>
        </div>

        {/* New Hadith button */}
        <button
          onClick={fetchHadith}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-400 text-white py-2 px-6 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? "Loading Hadith..." : "New Hadith"}
        </button>
      </div>
    </div>
  );
};

export default HadithGenerator;
