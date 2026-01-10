import { History, Star, Trash2, Sparkles, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { 
  useGetFlashcardHistoryQuery,
  useGetIndividualFavoritesQuery,
  useToggleFavoriteMutation,
  useDeleteFlashcardSetMutation,
  type FlashcardSet,
  type FavoriteFlashcard
} from "../../store/Slices/flashcardApi";

interface FlashcardHistoryProps {
  onSelectFlashcardSet: (flashcards: Array<{term: string; definition: string; highlights?: string[]}>) => void;
  onBack: () => void;
}

export default function FlashcardHistory({ onSelectFlashcardSet, onBack }: FlashcardHistoryProps) {
  const { data: historyData, isLoading: loading } = useGetFlashcardHistoryQuery();
  const { data: individualFavoritesData } = useGetIndividualFavoritesQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [deleteFlashcardSet] = useDeleteFlashcardSetMutation();

  const recentSets = historyData?.recent || [];
  const favoriteSets = historyData?.favorites || [];
  const individualFavorites = individualFavoritesData?.favorites || [];

  const handleToggleFavorite = async (flashcardId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await toggleFavorite(flashcardId).unwrap();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDeleteSet = async (flashcardId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete this flashcard set?")) return;
    try {
      await deleteFlashcardSet(flashcardId).unwrap();
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
    }
  };

  const handleSelectSet = (flashcardSet: FlashcardSet) => {
    onSelectFlashcardSet(flashcardSet.flashcards.flashcards);
  };

  const handleViewAllFavorites = () => {
    // Use individual favorites
    const favoriteFlashcards = individualFavorites.map(fav => ({
      term: fav.term,
      definition: fav.definition,
      highlights: fav.highlights,
    }));
    onSelectFlashcardSet(favoriteFlashcards);
  };

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    
    // The backend now returns raw timestamp strings from PostgreSQL
    // Format: "2026-01-10 07:50:33.344107" or "2026-01-10T12:50:33.344Z"
    // We need to add 'Z' if it doesn't have timezone info to parse as UTC
    let utcDateString = dateString;
    if (!dateString.includes('Z') && !dateString.includes('+') && !dateString.includes('T')) {
      // Space-separated format from DB, convert to ISO and mark as UTC
      utcDateString = dateString.replace(' ', 'T') + 'Z';
    }
    
    const date = new Date(utcDateString);
    
    // Check if invalid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid date';
    }
    
    // Format as local date and time
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-57px)] py-8 px-4 overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pb-8"
      >
        {/* Header */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-800 rounded-lg transition-all mb-8 font-medium backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to options
        </button>

        <div className="flex items-start gap-4 mb-10">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30">
            <History className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Your Flashcards
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {recentSets.length} recent sets • {individualFavorites.length} favorites
            </p>
          </div>
        </div>
        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Recent Sets Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <History className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Sets
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {recentSets.length} flashcard {recentSets.length === 1 ? 'set' : 'sets'}
                  </p>
                </div>
              </div>

              {recentSets.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                    <History className="text-gray-400 dark:text-gray-500" size={24} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No recent flashcards yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                    Generate some to see them here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentSets.map((set) => (
                    <div
                      key={set.id}
                      onClick={() => handleSelectSet(set)}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all"
                    >
                      <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                        set.source_type === 'ai'
                          ? 'bg-blue-100 dark:bg-blue-900/40'
                          : 'bg-purple-100 dark:bg-purple-900/40'
                      }`}>
                        {set.source_type === 'ai' ? (
                          <Sparkles className="text-blue-600 dark:text-blue-400" size={18} />
                        ) : (
                          <FileText className="text-purple-600 dark:text-purple-400" size={18} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
                          {set.title || set.topic || 'Untitled Set'}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {set.flashcards.flashcards.length} cards • {formatTimeAgo(set.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={(e) => handleDeleteSet(set.id, e)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group/delete"
                          title="Delete set"
                        >
                          <Trash2 size={18} className="text-gray-400 dark:text-gray-500 group-hover/delete:text-red-500" />
                        </button>
                        <div className="ml-2">
                          <ArrowRight className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                    <Star className="text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Favorite Cards
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {individualFavorites.length} saved {individualFavorites.length === 1 ? 'card' : 'cards'}
                    </p>
                  </div>
                </div>
                {individualFavorites.length > 0 && (
                  <button
                    onClick={handleViewAllFavorites}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <Star size={16} className="fill-white" />
                    View All Favorites
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {individualFavorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                    <Star className="text-gray-400 dark:text-gray-500" size={24} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No favorite cards yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                    Star cards while studying to save them
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {individualFavorites.map((flashcard) => (
                    <div
                      key={flashcard.id}
                      className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Star className="text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400 flex-shrink-0 mt-0.5" size={14} />
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 flex-1">
                          {flashcard.term}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 ml-6">
                        {flashcard.definition}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}