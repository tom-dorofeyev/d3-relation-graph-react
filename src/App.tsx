import './App.css';
import { exampleData } from './RelatonGraph/example.data';
import RelationGraph from './RelatonGraph/RelationGraph';

function App() {
  return (
    <div className="App">
      <RelationGraph
        width={900}
        height={600}
        dataset={exampleData}
      />
    </div>
  );
}

export default App;
