import { useState } from 'react';

import axios from 'axios';

import { DatePicker, Input, Radio, message, RadioChangeEvent } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

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

import ServiceInterface from './ServiceInterface';

const Form = () => {
  const [stampValue, setStampValue] = useState<number>(1);
  const [signValue, setSignValue] = useState<number>(1);
  const [pdvValue, setPdvValue] = useState<number>(1);
  const [servicePanelOpen, setServicePanelOpen] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceInterface[]>([]);

  const onFinish = async (values: any) => {
    try {
      // close services panel because of inputs
      setServicePanelOpen(false);

      // these properties shouldn't be included when sending the invoice Creation request
      const serviceProperties = [
        'amount',
        'pricePerUnit',
        'serviceType',
        'unit',
      ];

      // filter properties to send
      const validKeys: string[] = Object.keys(values).filter(
        (key: string) => serviceProperties.indexOf(key) === -1
      );

      // create Object to send to server
      const data: any = {
        stamp: stampValue === 1,
        sign: signValue === 1,
        pdv: pdvValue === 1,
      };
      validKeys.forEach((key: string) => {
        data[key] = values[key];
      });

      const invoiceCreationResponse = await axios.post(
        'http://localhost:5000/invoices',
        data
      );

      console.log(invoiceCreationResponse);

      if (invoiceCreationResponse.status !== 200) {
        message.error('Kreiranje fakture neuspesno');
        return;
      }

      message.success('Faktura uspesno kreirana');

      // save time by not sending request
      if (!services.length) {
        window.location.reload();
        return;
      }

      const invoiceId = invoiceCreationResponse.data;

      const servicesResponse = await axios.post(
        `http://localhost:5000/invoices/create-services/${invoiceId}`,
        services
      );

      console.log(servicesResponse);

      if (servicesResponse.status !== 200) {
        message.error('Usluge vezane za fakturu nisu unete uspesno');
      }

      message.success('Usluge vezane za fakturu unete uspesno!');

      window.location.reload();
    } catch (err: any) {
      message.error('Greska u aplikaciji!');
    }
  };

  const checkServiceInputs = (
    type: string,
    unit: string,
    amount: number,
    pricePerUnit: number
  ) => {
    if (!type || !unit || !amount || !pricePerUnit) {
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

  function addService(): void {
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
  }

  const removeService = (idx: number) => {
    if (window.confirm('Do you want to remove this service?')) {
      const newServices = services.filter(
        (service: ServiceInterface, index: number) => idx !== index
      );
      setServices(newServices);
    }
  };

  return (
    <FormElement onFinish={onFinish}>
      <FormCaption>Kreiraj fakturu</FormCaption>

      <FormElement.Item
        label="Ime fakture"
        name="invoiceName"
        rules={[
          {
            required: true,
            message: 'Unos imena je obavezan!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Ime kompanije"
        name="companyName"
        rules={[
          {
            required: true,
            message: 'Unesite ime kompanije!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Adresa"
        name="address"
        rules={[
          {
            required: true,
            message: 'Unesite adresu!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Grad"
        name="city"
        rules={[
          {
            required: true,
            message: 'Unesite grad',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="PIB"
        name="pib"
        rules={[
          {
            required: true,
            message: 'Unesite pib',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Datum izvrsenja"
        name="closingDate"
        rules={[
          {
            required: true,
            message: 'Odaberite datum!',
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
            <Service key={(Math.random() + 1).toString(36).substring(7)}>
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
        <Radio value={1}>Pecat obavezan</Radio>
        <Radio value={2}>Pecat nije potreban</Radio>
        <hr />
      </Radio.Group>

      <Radio.Group
        onChange={(e: RadioChangeEvent) => setSignValue(e.target.value)}
        value={signValue}
        style={{ margin: 5 }}
      >
        <hr />
        <Radio value={1}>Potpis obavezan</Radio>
        <Radio value={2}>Potpis nije potreban</Radio>
        <hr />
      </Radio.Group>

      <Radio.Group
        onChange={(e: RadioChangeEvent) => setPdvValue(e.target.value)}
        value={pdvValue}
        style={{ margin: 5 }}
      >
        <hr />
        <Radio value={1}>Poreznik je u pdv sistemu</Radio>
        <Radio value={2}>Poreznik nije u pdv sistemu</Radio>
        <hr />
      </Radio.Group>

      <StyledButton htmlType="submit">Kreiraj fakturu</StyledButton>
    </FormElement>
  );
};

export default Form;
