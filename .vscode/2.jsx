import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Search, Thermometer } from 'lucide-react';
import { toast } from 'sonner';

const symptomData = {
  fever: {
    name: 'Fever',
    description: "A fever is a temporary increase in your body temperature, and it's a common sign that your body is fighting off an illness or infection. It's not an illness itself, but rather a symptom that your immune system is active.",
    symptoms: [
      'Feeling hot, flushed skin',
      'Chills and shivering',
      'Sweating',
      'Headache',
      'Muscle aches',
      'Fatigue'
    ],
    causes: [
      {
        category: 'Infections (Most Common)',
        items: [
          'Viral (flu, cold, COVID-19)',
          'Bacterial (strep throat, UTI, pneumonia)'
        ]
      },
      {
        category: 'Other Causes',
        items: [
          'Inflammation (from autoimmune diseases, arthritis)',
          'Heat Exhaustion',
          'Certain Medications',
          'Some Cancers (less common)'
        ]
      }
    ],
    remedies: [
      'Hydrate: Drink water, broth, or electrolyte drinks.',
      'Rest: Help your body fight the illness.',
      'Cool Compress: Apply a damp cloth to your forehead or wrists.',
      'Light Clothing: Wear light layers to avoid trapping heat.',
      'Medication: Use ibuprofen or acetaminophen as directed for comfort.'
    ]
  },
  headache: {
    name: 'Headache',
    description: "A headache is pain or discomfort in the head, scalp, or neck. Most headaches are not serious and can be managed with rest and over-the-counter medications.",
    symptoms: [
      'Dull, aching head pain',
      'Pressure across forehead',
      'Tenderness on scalp or neck',
      'Tightness around head',
      'Sensitivity to light or sound'
    ],
    causes: [
      {
        category: 'Common Triggers',
        items: [
          'Stress and tension',
          'Poor posture',
          'Dehydration',
          'Lack of sleep'
        ]
      },
      {
        category: 'Medical Causes',
        items: [
          'Migraines',
          'Sinus infections',
          'High blood pressure',
          'Eye strain'
        ]
      }
    ],
    remedies: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compress to head or neck',
      'Stay hydrated with plenty of water',
      'Practice relaxation techniques',
      'Take over-the-counter pain relievers as directed'
    ]
  },
  cough: {
    name: 'Cough',
    description: "A cough is a reflex action to clear your airways of mucus, irritants, or foreign particles. It can be acute (short-term) or chronic (lasting more than 8 weeks).",
    symptoms: [
      'Dry or productive cough',
      'Throat irritation',
      'Chest tightness',
      'Wheezing',
      'Shortness of breath'
    ],
    causes: [
      {
        category: 'Infections',
        items: [
          'Common cold',
          'Flu',
          'Bronchitis',
          'Pneumonia'
        ]
      },
      {
        category: 'Other Causes',
        items: [
          'Allergies',
          'Asthma',
          'Acid reflux',
          'Environmental irritants'
        ]
      }
    ],
    remedies: [
      'Stay hydrated to thin mucus',
      'Use honey or lozenges for throat relief',
      'Humidify the air in your room',
      'Avoid smoke and other irritants',
      'Rest and allow your body to heal'
    ]
  },
  fatigue: {
    name: 'Fatigue',
    description: "Fatigue is a feeling of constant tiredness or weakness that can be physical, mental, or both. It differs from drowsiness and is often not relieved by sleep.",
    symptoms: [
      'Constant tiredness',
      'Lack of energy',
      'Difficulty concentrating',
      'Muscle weakness',
      'Slowed reflexes'
    ],
    causes: [
      {
        category: 'Lifestyle Factors',
        items: [
          'Poor sleep habits',
          'Stress',
          'Poor diet',
          'Lack of exercise'
        ]
      },
      {
        category: 'Medical Conditions',
        items: [
          'Anemia',
          'Thyroid problems',
          'Depression',
          'Chronic fatigue syndrome'
        ]
      }
    ],
    remedies: [
      'Establish a regular sleep schedule',
      'Exercise regularly but moderately',
      'Eat a balanced, nutritious diet',
      'Manage stress through relaxation techniques',
      'Consult a doctor if fatigue persists'
    ]
  },
  nausea: {
    name: 'Nausea',
    description: "Nausea is an uneasy feeling in the stomach that often comes before vomiting. It can be caused by many different conditions and is usually temporary.",
    symptoms: [
      'Feeling of unease in stomach',
      'Increased saliva production',
      'Aversion to food',
      'Dizziness',
      'Sweating'
    ],
    causes: [
      {
        category: 'Common Causes',
        items: [
          'Food poisoning',
          'Motion sickness',
          'Early pregnancy',
          'Medication side effects'
        ]
      },
      {
        category: 'Medical Conditions',
        items: [
          'Gastroenteritis',
          'Migraine',
          'Inner ear problems',
          'Anxiety'
        ]
      }
    ],
    remedies: [
      'Sip clear or ice-cold drinks slowly',
      'Eat bland foods like crackers or toast',
      'Avoid strong odors and greasy foods',
      'Try ginger tea or peppermint',
      'Rest in a comfortable position with head elevated'
    ]
  }
};

export const SymptomDetailPage = () => {
  const { symptomId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const symptom = symptomData[symptomId] || symptomData.fever;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    } else {
      toast.error('Please enter a symptom to search');
    }
  };

  const handleSearchAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-muted/50 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary font-display">
              SymptomsGuide
            </h1>
            
            <form onSubmit={handleSearch} className="w-full sm:w-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={symptom.name}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 sm:w-80 pr-12 bg-card/80 backdrop-blur-sm border-border focus:border-primary transition-smooth"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </form>
          </div>
        </div>

        {/* Description Card */}
        <Card className="mb-6 p-6 lg:p-8 bg-gradient-card border-border/50 shadow-medium">
          <p className="text-lg leading-relaxed text-card-blue-foreground">
            {symptom.description}
          </p>
        </Card>

        {/* Information Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Symptoms Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-smooth flex flex-col">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground font-display">
                  Common {symptom.name} Symptoms:
                </h2>
              </div>
            </div>
            <ScrollArea className="flex-1 h-[320px]">
              <div className="p-6 space-y-3">
                {symptom.symptoms.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary font-semibold mt-0.5">•</span>
                    <p className="text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Causes Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-smooth flex flex-col">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold text-foreground font-display">
                Common Causes of {symptom.name}:
              </h2>
            </div>
            <ScrollArea className="flex-1 h-[320px]">
              <div className="p-6 space-y-4">
                {symptom.causes.map((cause, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      • {cause.category}:
                    </h3>
                    <div className="ml-4 space-y-2">
                      {cause.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-foreground/90 text-sm leading-relaxed">
                          · {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Remedies Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-smooth flex flex-col">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold text-foreground font-display">
                Possible {symptom.name} Remedies:
              </h2>
            </div>
            <ScrollArea className="flex-1 h-[320px]">
              <div className="p-6 space-y-3">
                {symptom.remedies.map((remedy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary font-semibold mt-0.5">•</span>
                    <p className="text-foreground leading-relaxed">{remedy}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Search Again Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleSearchAgain}
            className="h-14 px-12 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft hover:shadow-medium"
          >
            Search Again
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-6 bg-muted/30 border-border/50">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Important:</strong> This information is for educational purposes only. 
              If you experience severe symptoms or your condition worsens, please seek immediate medical attention.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomDetailPage;
