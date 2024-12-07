import { useState } from 'react';
import { Button } from '../ui/button'; // Adjusted import path if necessary
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'; // Adjusted import path if necessary
import { Textarea } from '../ui/textarea'; // Adjusted import path if necessary
import { Card, CardContent } from '../ui/card'; // Adjusted import path if necessary
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddNewProject from './AddNewProject'; // Ensure this path is correct

export default function CanvasPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`<h1>Welcome, \${name}!</h1>\`;
}

const result = greet('AI Enthusiast');
console.log('Function returned:', result);
  `.trim());
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const runCode = () => {
    setIsLoading(true);
    setOutput('');
    const originalLog = console.log;
    const logs = [];

    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog.apply(console, args);
    };

    try {
      const result = new Function(code)();
      setOutput(logs.join('\n') + (result !== undefined ? '\nReturned: ' + result : ''));
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      console.log = originalLog;
      setIsLoading(false);
    }
  };

  const handleAddProject = (projectName) => {
    console.log('New project added:', projectName);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Code Canvas</h1>
      <AddNewProject onAdd={handleAddProject} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Code Editor</h2>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono h-[400px] mb-4"
              placeholder="Enter your code here..."
            />
            <Button onClick={runCode} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Code'
              )}
            </Button>
            <Button onClick={() => setShowPreview(!showPreview)} className="mt-4 w-full">
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button 
              onClick={() => window.open("https://v0.dev/chat/b/b_6CfdjS7nRcU?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fvMTSxwnyx8OvbP6.MuN22K25iC4kkqEZF3PWz4VPTJcCPeoAQnBbfrT9xu4gvf3m_NemVKjKYl0.RTNWY7PzXOjnJ1YeO6jE-A", "_blank")}
              className="mt-4 w-full"
            >
              Open AI New Project Step
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Output</h2>
            <Tabs defaultValue="preview">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="h-[400px] overflow-auto">
                {showPreview && (
                  <div 
                    id="preview" 
                    className="p-4 bg-white rounded border"
                    dangerouslySetInnerHTML={{ __html: output.split('\n').pop() || '' }}
                  />
                )}
              </TabsContent>
              <TabsContent value="console" className="h-[400px] overflow-auto">
                <pre className="p-4 bg-black text-green-400 rounded font-mono text-sm">
                  {output}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}