import { Question } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | null;
  onAnswerChange: (questionIndex: number, answer: number) => void;
  choiceLabels: string[];
}

export function QuizQuestion({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onAnswerChange, 
  choiceLabels 
}: QuizQuestionProps) {
  return (
    <Card className="p-6 mb-7 bg-card border-0 shadow-quiz hover:shadow-quiz-hover transition-all duration-300 ease-quiz rounded-[14px]">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground leading-relaxed">
          {questionIndex + 1}. {question.q}
        </h3>
      </div>
      
      <RadioGroup
        value={selectedAnswer?.toString() || ""}
        onValueChange={(value) => onAnswerChange(questionIndex, parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-4">
            <RadioGroupItem 
              value={optionIndex.toString()} 
              id={`q${questionIndex}_${optionIndex}`}
              className="w-5 h-5 text-primary border-2"
            />
            <Label 
              htmlFor={`q${questionIndex}_${optionIndex}`}
              className="flex-1 text-base text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer leading-relaxed font-medium"
            >
              {choiceLabels[optionIndex]} {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
}