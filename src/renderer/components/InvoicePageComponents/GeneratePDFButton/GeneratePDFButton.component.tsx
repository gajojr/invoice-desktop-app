import { Button } from 'antd';

const GeneratePDFButton = () => {
  const generatePDF = () => {
    (document.getElementById('generate-pdf') as HTMLElement).style.display =
      'none';
    window.print();
    (document.getElementById('generate-pdf') as HTMLElement).style.display =
      'flex';
  };

  return (
    <Button type="primary" id="generate-pdf" onClick={generatePDF}>
      Download PDF
    </Button>
  );
};

export default GeneratePDFButton;
