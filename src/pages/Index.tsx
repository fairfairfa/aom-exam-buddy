import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizResults } from "@/components/QuizResults";
import { questions, choiceLabels, shuffleQuestions, Question } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() => shuffleQuestions(questions));
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswerChange = (questionIndex: number, answer: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredIndex = userAnswers.findIndex(answer => answer === null);
    if (unansweredIndex !== -1) {
      toast({
        title: "กรุณาตอบคำถามให้ครบ",
        description: `กรุณาตอบคำถามข้อที่ ${unansweredIndex + 1} ให้ครบก่อนส่งคำตอบ`,
        variant: "destructive",
      });
      return;
    }

    // Show confirmation dialog
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าจะส่งคำตอบ?")) {
      return;
    }

    // Calculate score
    let newScore = 0;
    currentQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    setIsSubmitted(true);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    toast({
      title: "ส่งคำตอบเรียบร้อย",
      description: "ดูผลคะแนนและรีวิวข้อสอบด้านล่าง",
    });
  };

  const handleRetry = () => {
    setCurrentQuestions(shuffleQuestions(questions));
    setUserAnswers(new Array(questions.length).fill(null));
    setIsSubmitted(false);
    setScore(0);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    toast({
      title: "เริ่มข้อสอบใหม่",
      description: "พร้อมทำข้อสอบแล้ว ขอให้โชคดี!",
    });
  };

  return (
    <div className="min-h-screen bg-quiz-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 leading-tight">
            ข้อสอบครูผู้ช่วย สำหรับ ออม
          </h1>
          <div className="w-24 h-1 bg-quiz-gradient mx-auto rounded-full mt-4"></div>
        </div>

        {!isSubmitted ? (
          <>
            {/* Quiz Questions */}
            <div className="space-y-6 mb-8">
              {currentQuestions.map((question, index) => (
                <QuizQuestion
                  key={index}
                  question={question}
                  questionIndex={index}
                  selectedAnswer={userAnswers[index]}
                  onAnswerChange={handleAnswerChange}
                  choiceLabels={choiceLabels}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="bg-quiz-gradient text-white shadow-quiz-button hover:shadow-quiz-button-hover transition-all duration-300 rounded-xl font-bold text-lg px-12 py-4 uppercase tracking-wide"
              >
                Submit
              </Button>
            </div>
          </>
        ) : (
          <QuizResults
            score={score}
            totalQuestions={currentQuestions.length}
            questions={currentQuestions}
            userAnswers={userAnswers}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
