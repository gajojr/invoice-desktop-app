import { useState, useEffect } from 'react';
import axios from 'axios';

import { message } from 'antd';
import Paper from './InvoicePaper.style';

import FromUser from '../FromUser/FromUser.component';
import ToUser from '../ToUser/ToUser.component';
import Services from '../ServicesComponent/Services.component';
import SignAndPDVInfo from '../SignAndPDVInfo/SignAndPDVInfo.component';

import ServiceInterface from '../ServiceInterface';
import InvoiceDataInterface from '../InvoiceDataInterface';

const InvoicePaper = ({ id }: { id: string }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceDataInterface>(
    {} as InvoiceDataInterface
  );
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [totalPriceOfAllServices, setTotalPriceOfAllServices] =
    useState<number>(0);

  const calculatePriceOfAllServices = (
    invoiceServices: ServiceInterface[]
  ): number => {
    let totalPrice = 0;
    invoiceServices.forEach((service: ServiceInterface) => {
      totalPrice += service.amount * service.pricePerUnit;
    });

    return totalPrice;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:5000/invoices/${id}`);
        console.log(response);

        setInvoiceData(response.data.exchangeData);
        setServices(response.data.services);

        setTotalPriceOfAllServices(
          calculatePriceOfAllServices(response.data.services)
        );
      } catch (err: any) {
        message.error('Greska u aplikaciji!');
      }
    })();
  }, [id]);

  return (
    // added class name for pdfJs to transform it into pdf
    <Paper className="invoice-paper">
      <FromUser />
      <ToUser invoiceData={invoiceData} />
      <Services
        services={services}
        totalPriceOfAllServices={totalPriceOfAllServices}
      />
      <SignAndPDVInfo invoiceData={invoiceData} />
    </Paper>
  );
};

export default InvoicePaper;
