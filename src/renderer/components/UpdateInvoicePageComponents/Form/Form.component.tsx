/* eslint-disable react/jsx-boolean-value */
import { useState, useEffect } from 'react';

import axios from 'axios';

import { DatePicker, Input, Radio, message, RadioChangeEvent } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { v4 as uuidGenerator } from 'uuid';

import ServiceInterface from '../../CreateInvoicePageComponents/Form/ServiceInterface';
import InvoiceInterface from './InvoiceInterface';

import {
  FormElement,
  FormCaption,
  StyledButton,
  ServicesForm,
  ServicePanelToggler,
  ServicesContainer,
  Service,
  ServiceField,
  RemoveIcon,
} from './Form.style';

const Form = ({ id }: { id: string }) => {
  const [stampValue, setStampValue] = useState<boolean>(true);
  const [signValue, setSignValue] = useState<boolean>(true);
  const [pdvValue, setPdvValue] = useState<boolean>(true);
  const [servicePanelOpen, setServicePanelOpen] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceInterface[]>([]);

  const fillInTheInputs = (invoiceData: InvoiceInterface) => {
    (document.getElementById('invoiceName') as HTMLInputElement).value =
      invoiceData.invoiceName;
    (document.getElementById('companyName') as HTMLInputElement).value =
      invoiceData.fromCompany;
    (document.getElementById('address') as HTMLInputElement).value =
      invoiceData.toAddress;
    (document.getElementById('city') as HTMLInputElement).value =
      invoiceData.toCity;
    (document.getElementById('pib') as HTMLInputElement).value =
      invoiceData.toPib;
    (document.getElementById('closingDate') as HTMLInputElement).value =
      invoiceData.closingDate;

    setStampValue(invoiceData.stampNeeded);
    setSignValue(invoiceData.signNeeded);
    setPdvValue(invoiceData.pdv);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/invoices/${id}`
        );

        const invoiceData = response.data.exchangeData;
        const servicesData = response.data.services;

        fillInTheInputs(invoiceData as InvoiceInterface);
        setServices(servicesData);

        console.log(response);
      } catch (err: any) {
        message.error('Greska u aplikaciji');
      }
    })();
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      // close services panel because of inputs
      setServicePanelOpen(false);

      const data = {
        ...values,
        stamp: stampValue,
        sign: signValue,
        pdv: pdvValue,
        services,
      };

      console.log(data);

      const invoiceResponse = await axios.post(
        `http://localhost:5000/invoices/update-invoice/${id}`,
        data
      );

      console.log(invoiceResponse);

      if (invoiceResponse.status !== 200) {
        message.error('Azuriranje nije uspelo');
        return;
      }

      message.success('Faktura azurirana');

      window.location.reload();
    } catch (err: any) {
      message.error('Greska u aplikaciji!');
    }
  };

  const checkServiceInputs = (
    service_type: string,
    unit: string,
    amount: number,
    price_per_unit: number
  ) => {
    if (!service_type || !unit || !amount || !price_per_unit) {
      return false;
    }

    return true;
  };

  const cleanServiceInputs = () => {
    // empty all inputs for service creation
    (document.getElementById('serviceType') as HTMLInputElement).value = '';
    (document.getElementById('unit') as HTMLInputElement).value = '';
    (document.getElementById('amount') as HTMLInputElement).value = '';
    (document.getElementById('pricePerUnit') as HTMLInputElement).value = '';
  };

  const removeService = (idx: number) => {
    if (window.confirm('Da li zelis da obrises ovu uslugu?')) {
      const newServices = services.filter(
        (service: ServiceInterface, index: number) => idx !== index
      );
      setServices(newServices);
    }
  };

  const addService = (): void => {
    const serviceType = (
      document.getElementById('serviceType') as HTMLInputElement
    ).value;
    const unit = (document.getElementById('unit') as HTMLInputElement).value;
    const amount = parseFloat(
      (document.getElementById('amount') as HTMLInputElement).value
    );
    const pricePerUnit = parseFloat(
      (document.getElementById('pricePerUnit') as HTMLInputElement).value
    );

    if (!checkServiceInputs(serviceType, unit, amount, pricePerUnit)) {
      message.error('You must fill in all the fields to add service');
      return;
    }

    setServices([
      ...services,
      { serviceType, unit, amount, pricePerUnit },
    ] as ServiceInterface[]);

    cleanServiceInputs();
  };

  return (
    <FormElement onFinish={onFinish}>
      <FormCaption>Azuriraj fakturu</FormCaption>

      <FormElement.Item
        label="Ime fakture"
        name="invoiceName"
        rules={[
          {
            required: true,
            message: 'Unesi ime fakture!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Kome: (ime preduzeca)"
        name="companyName"
        rules={[
          {
            required: true,
            message: 'Unesi ime preduzeca!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Kome: adresa"
        name="address"
        rules={[
          {
            required: true,
            message: 'Unesi adresu!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Kome: grad"
        name="city"
        rules={[
          {
            required: true,
            message: 'Unesi grad!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Kome: PIB"
        name="pib"
        rules={[
          {
            required: true,
            message: 'Unesi PIB!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Datum izrade"
        name="closingDate"
        rules={[
          {
            required: true,
            message: 'Unesi datum izrade!',
          },
        ]}
      >
        <DatePicker />
      </FormElement.Item>

      <ServicePanelToggler>
        Dodaj uslugu
        {servicePanelOpen ? (
          <CaretUpOutlined
            onClick={() => setServicePanelOpen(!servicePanelOpen)}
            style={{ fontSize: '32px', color: '#08c' }}
          />
        ) : (
          <CaretDownOutlined
            onClick={() => setServicePanelOpen(!servicePanelOpen)}
            style={{ fontSize: '32px', color: '#08c' }}
          />
        )}
      </ServicePanelToggler>

      <ServicesForm
        style={{ display: `${servicePanelOpen ? 'flex' : 'none'}` }}
      >
        <FormElement.Item
          label="Tip usluge:"
          name="serviceType"
          id="serviceType"
        >
          <Input />
        </FormElement.Item>

        <FormElement.Item label="Jedinica:" name="unit" id="unit">
          <Input />
        </FormElement.Item>

        <FormElement.Item label="Kolicina:" name="amount" id="amount">
          <Input />
        </FormElement.Item>

        <FormElement.Item
          label="Cena po jedinici:"
          name="pricePerUnit"
          id="pricePerUnit"
        >
          <Input />
        </FormElement.Item>

        <StyledButton
          onClick={() => {
            addService();
            setServicePanelOpen(!servicePanelOpen);
          }}
        >
          Dodaj uslugu
        </StyledButton>
      </ServicesForm>

      {services.length ? (
        <ServicesContainer>
          <p>Usluge:</p>
          {services.map((service: ServiceInterface, idx: number) => (
            <Service key={uuidGenerator()}>
              <ServiceField>{service.serviceType}</ServiceField>
              <ServiceField>{service.unit}</ServiceField>
              <ServiceField>{service.amount}</ServiceField>
              <ServiceField>{service.pricePerUnit}</ServiceField>
              <RemoveIcon onClick={() => removeService(idx)} />
            </Service>
          ))}
        </ServicesContainer>
      ) : null}

      <Radio.Group
        onChange={(e: RadioChangeEvent) => setStampValue(e.target.value)}
        value={stampValue}
        style={{ margin: 5 }}
      >
        <hr />
        <Radio value={true}>Pecat obavezan</Radio>
        <Radio value={false}>Pecat nije potreban</Radio>
        <hr />
      </Radio.Group>

      <Radio.Group
        onChange={(e: RadioChangeEvent) => setSignValue(e.target.value)}
        value={signValue}
        style={{ margin: 5 }}
      >
        <hr />
        <Radio value={true}>Potpis obavezan</Radio>
        <Radio value={false}>Potpis nije potreban</Radio>
        <hr />
      </Radio.Group>

      <Radio.Group
        onChange={(e: RadioChangeEvent) => setPdvValue(e.target.value)}
        value={pdvValue}
        style={{ margin: 5 }}
      >
        <hr />
        <Radio value={true}>Poreznik je u pdv sistemu</Radio>
        <Radio value={false}>Poreznik nije u pdv sistemu</Radio>
        <hr />
      </Radio.Group>

      <StyledButton htmlType="submit">Azuriraj fakturu</StyledButton>
    </FormElement>
  );
};

export default Form;
