function CompletionModal({ score, difficulty, time, onSubmit, onClose, isPending, isConfirming, isConfirmed }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-brown-100 rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-medium border-2 border-brown-300">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-brown-800 mb-6">
            {isConfirmed ? 'Score Saved' : 'Puzzle Complete'}
          </h2>

          {!isConfirmed && (
            <>
              {/* Score Details */}
              <div className="space-y-3 mb-6">
                <div className="bg-white rounded-lg p-5 border-2 border-brown-300 shadow-soft">
                  <p className="text-brown-600 text-sm mb-1 font-medium">Your Score</p>
                  <p className="text-4xl font-semibold text-brown-800">{score}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-brown-300 shadow-soft">
                    <p className="text-brown-600 text-xs mb-1 font-medium">Difficulty</p>
                    <p className="text-lg font-semibold text-brown-800">{difficulty}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border-2 border-brown-300 shadow-soft">
                    <p className="text-brown-600 text-xs mb-1 font-medium">Time</p>
                    <p className="text-lg font-semibold text-brown-800">{formatTime(time)}</p>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="bg-brown-200 border-l-4 border-brown-700 p-4 mb-6 text-left rounded shadow-soft">
                <p className="text-sm text-brown-800 leading-relaxed">
                  <strong className="font-semibold">Save to Blockchain</strong>
                  <br />
                  To record your score onchain, confirm the transaction in your wallet.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white text-brown-700 rounded-lg font-medium hover:bg-brown-50 hover:shadow-medium transition-all border-2 border-brown-300 shadow-soft"
                  disabled={isPending || isConfirming}
                >
                  Skip
                </button>
                <button
                  onClick={onSubmit}
                  disabled={isPending || isConfirming}
                  className="flex-1 px-6 py-3 bg-brown-700 text-white rounded-lg font-medium hover:bg-brown-800 hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soft"
                >
                  {isPending || isConfirming ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isPending ? 'Confirm...' : 'Confirming...'}
                    </span>
                  ) : (
                    'Submit to Blockchain'
                  )}
                </button>
              </div>
            </>
          )}

          {isConfirmed && (
            <>
              <p className="text-brown-700 mb-6 leading-relaxed">
                Your score has been successfully recorded on the blockchain.
              </p>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-brown-700 text-white rounded-lg font-medium hover:bg-brown-800 hover:shadow-medium transition-all shadow-soft"
              >
                Continue Playing
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletionModal;
