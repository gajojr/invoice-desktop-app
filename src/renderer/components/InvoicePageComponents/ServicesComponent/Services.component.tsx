import ServiceInterface from '../ServiceInterface';
import { ServicesTable, Td, Th } from './Services.style';

const Services = ({
  services,
  totalPriceOfAllServices,
}: {
  services: ServiceInterface[];
  totalPriceOfAllServices: number;
}) => {
  return (
    <div>
      <ServicesTable>
        <thead>
          <tr>
            <Th>Tip usluge</Th>
            <Th>Jedinica</Th>
            <Th>Kolicina</Th>
            <Th>Cena po jedinici</Th>
            <Th>Ukupno</Th>
          </tr>
        </thead>
        <tbody>
          {services.map((service: ServiceInterface) => {
            return (
              <tr key={service.id}>
                <Td>{service.serviceType}</Td>
                <Td>{service.unit}</Td>
                <Td>{service.amount}</Td>
                <Td>{service.pricePerUnit}</Td>
                <Td>{service.amount * service.pricePerUnit}</Td>
              </tr>
            );
          })}
        </tbody>
      </ServicesTable>

      <hr />

      <h3>Ukupna cena svih usluga: {totalPriceOfAllServices}(RSD)</h3>

      <hr />
    </div>
  );
};

export default Services;
