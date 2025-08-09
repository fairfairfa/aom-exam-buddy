import { Question, choiceLabels } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Download, RotateCcw, Lightbulb } from "lucide-react";
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
  
  const getScoreMessage = () => {
    if (score < 10) {
      return `ได้ ${score}/${totalQuestions}\nเก่งแล้วรักเหมือนเดิมนะ แต่ไปอ่านหนังสือเพิ่มด้วยนะ`;
    } else if (score <= 15) {
      return `ได้ ${score}/${totalQuestions}\nเก่งมาก รัก ๆ น้า`;
    } else if (score <= 18) {
      return `ได้ ${score}/${totalQuestions}\nสุดยอดดด รักที่สุด`;
    } else {
      return `ได้ ${score}/${totalQuestions}\nโอ้ววว รักคุณครูคนนี้ที่สุด`;
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

    // Create a capture div
    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      background: white;
      padding: 40px;
      width: 600px;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      border-radius: 14px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.07);
      text-align: center;
      position: fixed;
      top: -9999px;
      left: -9999px;
    `;
    
    captureDiv.innerHTML = `
      <h1 style="margin-bottom: 20px; color: hsl(215, 84%, 58%); font-size: 1.8rem; font-weight: 700;">
        ผลการทดสอบ ข้อสอบครูผู้ช่วย สำหรับ ออม
      </h1>
      <div style="font-size: 2rem; font-weight: 700; margin-bottom: 20px; color: #1e293b; white-space: pre-line;">
        ${getScoreMessage()}
      </div>
      <div style="font-size: 1.1rem; color: #64748b;">
        วันที่ส่งข้อสอบ: ${dateStr}<br>
        เวลา: ${timeStr}
      </div>
    `;

    document.body.appendChild(captureDiv);

    try {
      const canvas = await html2canvas(captureDiv, { 
        scale: 2,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = 'ผลการทดสอบ_ข้อสอบครูผู้ช่วย.png';
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      document.body.removeChild(captureDiv);
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <Card 
        ref={resultRef}
        className="p-8 text-center bg-card border-0 shadow-quiz rounded-2xl"
      >
        <div className="text-3xl font-bold text-foreground mb-2 whitespace-pre-line leading-relaxed">
          {getScoreMessage()}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={downloadResult}
          variant="default"
          size="lg"
          className="bg-quiz-gradient text-white shadow-quiz-button hover:shadow-quiz-button-hover transition-all duration-300 rounded-xl font-semibold text-base px-8"
        >
          <Download className="mr-2 h-5 w-5" />
          ดาวน์โหลดผลสอบเป็นรูป
        </Button>
        
        <Button 
          onClick={onRetry}
          variant="outline"
          size="lg"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-semibold text-base px-8"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          ทำข้อสอบใหม่
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