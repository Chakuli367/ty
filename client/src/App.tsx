function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-6xl font-black text-slate-900 leading-tight">
            Transform Your
            <span className="text-blue-600 block">Social Skills</span>
            with AI Coaching
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get a personalized action plan based on proven principles from 
            "How to Win Friends and Influence People" — powered by intelligent AI conversations.
          </p>
          
          <button className="bg-blue-600 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Your Journey
          </button>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              🎯
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Personalized Goals</h3>
            <p className="text-slate-600">AI analyzes your specific challenges and creates SMART goals tailored to your social skills journey.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              🤖
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Avatar Coaching</h3>
            <p className="text-slate-600">Choose from three unique AI personalities that match your learning style - visionary, analytical, or resilient.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              📚
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Carnegie Principles</h3>
            <p className="text-slate-600">Built on time-tested principles from "How to Win Friends and Influence People" methodology.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
