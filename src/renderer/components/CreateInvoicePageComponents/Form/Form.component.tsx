import { useState } from 'react';

import axios from 'axios';

import ServiceInterface from './ServiceInterface';

import { FormElement, FormCaption, StyledButton, ServicesForm, ServicePanelToggler, ServicesContainer, Service, ServiceField, RemoveIcon } from './Form.style';
import { DatePicker, Input, Radio, message, RadioChangeEvent } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

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
            const serviceProperties = ['amount', 'pricePerUnit', 'serviceType', 'unit'];

            // filter properties to send
            const validKeys: string[] = Object.keys(values).filter((key: string) => serviceProperties.indexOf(key) === -1);

            // create Object to send to server
            const data: any = {
                stamp: stampValue === 1 ? true : false,
                sign: signValue === 1 ? true : false,
                pdv: pdvValue === 1 ? true : false
            }
            validKeys.map((key: string) => data[key] = values[key]);

            const invoiceCreationResponse = await axios.post('/invoices', data, {
                params: {
                    username: sessionStorage.getItem('username')
                },
                headers: {
                    'x-access-token': sessionStorage.getItem('token')
                }
            });

            console.log(invoiceCreationResponse);

            if (invoiceCreationResponse.status !== 200) {
                return message.error('Creating failed');
            }

            message.success('Invoice created');

            // save time by not sending request
            if (!services.length) {
                window.location.reload();
                return;
            }

            const invoiceId = invoiceCreationResponse.data;

            const servicesResponse = await axios.post(`/invoices/create-services/${invoiceId}`, services, {
                headers: {
                    'x-access-token': sessionStorage.getItem('token')
                }
            });

            console.log(servicesResponse);

            if (servicesResponse.status !== 200) {
                message.error('services insert failed');
            }

            message.success('Services inserted successfully');

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.status === 401) {
                message.error('Auth failed');
            } else {
                message.error('Server error occurred');
            }

            sessionStorage.clear();
            window.location.href = '/';
        }
    }

    const addService = () => {
        const service_type = (document.getElementById('serviceType') as HTMLInputElement).value;
        const unit = (document.getElementById('unit') as HTMLInputElement).value;
        const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        const price_per_unit = parseFloat((document.getElementById('pricePerUnit') as HTMLInputElement).value);

        if (!checkServiceInputs(service_type, unit, amount, price_per_unit)) {
            return message.error('You must fill in all the fields to add service');
        }

        setServices([...services, { service_type, unit, amount, price_per_unit }] as ServiceInterface[]);

        cleanServiceInputs();
    }

    const checkServiceInputs = (type: string, unit: string, amount: number, pricePerUnit: number) => {
        if (!type || !unit || !amount || !pricePerUnit) {
            return false;
        }

        return true;
    }

    const cleanServiceInputs = () => {
        // empty all inputs for service creation
        (document.getElementById('serviceType') as HTMLInputElement).value = '';
        (document.getElementById('unit') as HTMLInputElement).value = '';
        (document.getElementById('amount') as HTMLInputElement).value = '';
        (document.getElementById('pricePerUnit') as HTMLInputElement).value = '';
    }

    const removeService = (idx: number) => {
        if (window.confirm('Do you want to remove this service?')) {
            const newServices = services.filter((service: ServiceInterface, index: number) => idx !== index);
            setServices(newServices);
        }
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Create invoice</FormCaption>

            <FormElement.Item
                label="Invoice name"
                name="invoiceName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your invoice name!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: company name"
                name="companyName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name of company!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the address of client!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: city"
                name="city"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name of client\' city!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: PIB"
                name="pib"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the client\'s pib!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Closing date"
                name="closingDate"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the closing date!',
                    },
                ]}
            >
                <DatePicker />
            </FormElement.Item>

            <ServicePanelToggler>Add service
                {
                    servicePanelOpen
                        ? <CaretUpOutlined onClick={() => setServicePanelOpen(!servicePanelOpen)} style={{ fontSize: '32px', color: '#08c' }} />
                        : <CaretDownOutlined onClick={() => setServicePanelOpen(!servicePanelOpen)} style={{ fontSize: '32px', color: '#08c' }} />
                }
            </ServicePanelToggler>

            <ServicesForm style={{ display: `${servicePanelOpen ? 'flex' : 'none'}` }}>
                <FormElement.Item
                    label="Service type:"
                    name="serviceType"
                    id="serviceType"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Unit:"
                    name="unit"
                    id="unit"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Amount:"
                    name="amount"
                    id="amount"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Price per unit:"
                    name="pricePerUnit"
                    id="pricePerUnit"
                >
                    <Input />
                </FormElement.Item>

                <StyledButton onClick={() => {
                    addService();
                    setServicePanelOpen(!servicePanelOpen);
                }}>Add service</StyledButton>
            </ServicesForm>

            {
                services.length
                    ? <ServicesContainer>
                        <p>Services:</p>
                        {services.map((service: ServiceInterface, idx: number) => (
                            <Service key={idx}>
                                <ServiceField>{service.service_type}</ServiceField>
                                <ServiceField>{service.unit}</ServiceField>
                                <ServiceField>{service.amount}</ServiceField>
                                <ServiceField>{service.price_per_unit}</ServiceField>
                                <RemoveIcon onClick={() => removeService(idx)} />
                            </Service>
                        ))}
                    </ServicesContainer>
                    : null
            }

            <Radio.Group onChange={(e: RadioChangeEvent) => setStampValue(e.target.value)} value={stampValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Stamp needed</Radio>
                <Radio value={2}>Stamp isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={(e: RadioChangeEvent) => setSignValue(e.target.value)} value={signValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Sign needed</Radio>
                <Radio value={2}>Sign isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={(e: RadioChangeEvent) => setPdvValue(e.target.value)} value={pdvValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Tax gatherer is in pdv system</Radio>
                <Radio value={2}>Tax gatherer isn't in pdv system</Radio>
                <hr />
            </Radio.Group>

            <StyledButton htmlType="submit">Create invoice</StyledButton>
        </FormElement>
    )
}

export default Form;
