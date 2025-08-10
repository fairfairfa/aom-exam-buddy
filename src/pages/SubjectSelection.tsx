import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizSubjects } from "@/data/questions";

interface SubjectSelectionProps {
  onSelectSubject: (subject: string) => void;
}

export default function SubjectSelection({ onSelectSubject }: SubjectSelectionProps) {
  return (
    <div className="min-h-screen bg-quiz-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 leading-tight">
            ข้อสอบครูผู้ช่วย สำหรับ ออม
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            เลือกวิชาที่ต้องการทำข้อสอบ
          </p>
          <div className="w-24 h-1 bg-quiz-gradient mx-auto rounded-full mt-4"></div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quizSubjects.map((subject) => (
            <Card key={subject.name} className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-xl">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {subject.questions.length} ข้อ
                </p>
                <Button
                  onClick={() => onSelectSubject(subject.name)}
                  className="w-full bg-quiz-gradient text-white hover:shadow-lg transition-all duration-300 rounded-xl font-semibold"
                >
                  เริ่มทำข้อสอบ
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}