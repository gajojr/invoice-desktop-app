import { jsPDF as JsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from 'antd';

const GeneratePDFButton = ({ id }: { id: string }) => {
  const generatePDF = () => {
    const input = document.querySelector('.invoice-paper');
    html2canvas(input as HTMLElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new JsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 0, 200);
        pdf.save(`invoice--${id}.pdf`);
        return 1; // always return eslint rule
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button type="primary" onClick={generatePDF}>
      Download PDF
    </Button>
  );
};

export default GeneratePDFButton;
