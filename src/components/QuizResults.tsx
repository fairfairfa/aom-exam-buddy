import { Question, choiceLabels } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Download, RotateCcw, Lightbulb, Trophy, Star, Target, Award } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: (number | null)[];
  onRetry: () => void;
}

export function QuizResults({ score, totalQuestions, questions, userAnswers, onRetry }: QuizResultsProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  
  const getScoreData = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    if (score < 10) {
      return {
        message: `${score}/${totalQuestions} คะแนน`,
        subtitle: "เก่งแล้วรักเหมือนเดิมนะ แต่ไปอ่านหนังสือเพิ่มด้วยนะ",
        color: "text-amber-500",
        bgColor: "from-amber-50 to-amber-100",
        icon: Target,
        percentage
      };
    } else if (score <= 15) {
      return {
        message: `${score}/${totalQuestions} คะแนน`,
        subtitle: "เก่งมาก รัก ๆ น้า",
        color: "text-blue-500",
        bgColor: "from-blue-50 to-blue-100",
        icon: Star,
        percentage
      };
    } else if (score <= 18) {
      return {
        message: `${score}/${totalQuestions} คะแนน`,
        subtitle: "สุดยอดดด รักที่สุด",
        color: "text-purple-500",
        bgColor: "from-purple-50 to-purple-100",
        icon: Award,
        percentage
      };
    } else {
      return {
        message: `${score}/${totalQuestions} คะแนน`,
        subtitle: "โอ้ววว รักคุณครูคนนี้ที่สุด",
        color: "text-emerald-500",
        bgColor: "from-emerald-50 to-emerald-100",
        icon: Trophy,
        percentage
      };
    }
  };

  const downloadResult = async () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('th-TH', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('th-TH', {
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });

    const scoreData = getScoreData();

    // Create a more beautiful capture div
    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 60px 50px;
      width: 700px;
      color: white;
      font-family: 'Inter', sans-serif;
      border-radius: 24px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
      text-align: center;
      position: fixed;
      top: -9999px;
      left: -9999px;
      background-size: 200% 200%;
    `;
    
    captureDiv.innerHTML = `
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 40px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
            🏆
          </div>
          <h1 style="margin: 0; font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.95);">
            ผลการทดสอบข้อสอบครูผู้ช่วย
          </h1>
        </div>
        
        <div style="background: rgba(255,255,255,0.9); color: #1e293b; border-radius: 16px; padding: 30px; margin: 20px 0;">
          <div style="font-size: 3rem; font-weight: 800; margin-bottom: 10px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${scoreData.message}
          </div>
          <div style="font-size: 1.4rem; font-weight: 600; color: #64748b; margin-bottom: 15px;">
            ${scoreData.percentage}% ความแม่นยำ
          </div>
          <div style="font-size: 1.2rem; color: #475569; line-height: 1.5;">
            ${scoreData.subtitle}
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 1rem; color: rgba(255,255,255,0.8);">
          <span>📅 ${dateStr}</span>
          <span>⏰ ${timeStr}</span>
        </div>
      </div>
      
      <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7); font-style: italic;">
        สำหรับ ออม ❤️
      </div>
    `;

    document.body.appendChild(captureDiv);

    try {
      const canvas = await html2canvas(captureDiv, { 
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `ผลการทดสอบ_ข้อสอบครูผู้ช่วย_${scoreData.percentage}%.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      document.body.removeChild(captureDiv);
    }
  };

  const scoreData = getScoreData();
  const IconComponent = scoreData.icon;

  return (
    <div className="space-y-8">
      {/* Enhanced Score Display */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 shadow-2xl rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative p-10 text-center">
          {/* Achievement Icon */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${scoreData.bgColor} shadow-lg`}>
              <IconComponent className={`w-10 h-10 ${scoreData.color}`} />
            </div>
          </div>
          
          {/* Score Display */}
          <div className="space-y-4">
            <div className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              {scoreData.message}
            </div>
            
            <div className="text-2xl font-semibold text-slate-400">
              {scoreData.percentage}% ความแม่นยำ
            </div>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${scoreData.percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
              {scoreData.subtitle}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={downloadResult}
          variant="default"
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl font-semibold text-base px-8 border-0"
        >
          <Download className="mr-2 h-5 w-5" />
          Save Result
        </Button>
        
        <Button 
          onClick={onRetry}
          variant="outline"
          size="lg"
          className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 rounded-2xl font-semibold text-base px-8"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">
          รีวิวข้อสอบ
        </h2>
        
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.answer;
          
          return (
            <Card key={index} className="p-6 bg-muted/50 border-0 rounded-xl">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {index + 1}. {question.q}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-quiz-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-quiz-error" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-quiz-success' : 'text-quiz-error'}`}>
                    {isCorrect ? 'ถูกต้อง' : 'ผิด'}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">คำตอบที่ถูก: </span>
                    <span className="text-quiz-success font-medium">
                      {choiceLabels[question.answer]} {question.options[question.answer]}
                    </span>
                  </div>
                  
                  {userAnswer !== null && (
                    <div>
                      <span className="font-medium">คุณเลือก: </span>
                      <span className={userAnswer === question.answer ? 'text-quiz-success' : 'text-quiz-error'}>
                        {choiceLabels[userAnswer]} {question.options[userAnswer]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}