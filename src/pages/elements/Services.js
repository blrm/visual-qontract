import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import { Row, Col, Card, CardHeading, CardBody, CardFooter, CardTitle } from 'patternfly-react';
import { sortByName } from '../../components/Utils';
import ServicesTable from '../../components/ServicesTable';
import GridSearch from '../../components/GridSearch';

function Services({ services, table }) {
  // cardsWidth * cardsPerRow must be <= 12 (bootstrap grid)
  const cardWidth = 4;
  const cardsPerRow = 3;
  const [selected, changeSelected] = useState('Name');
  const [filterText, changeFilterText] = useState('');
  const lcFilter = filterText.toLowerCase();
  function matches(s) {
    return selected === 'Name' && s.name.toLowerCase().includes(lcFilter);
  }
  const matchedServices = services.filter(matches);


  if (typeof(table) !== 'undefined' && table) {
    return <ServicesTable services={matchedServices}/>;
  }

  const rows = chunk(sortByName(matchedServices), cardsPerRow).map(c => (
    <Row key={c[0].path}>
      {c.map(s => (
        <Col xs={cardWidth} key={s.path}>
          <Card accented>
            <CardHeading>
              <CardTitle>
                {s.name}
              </CardTitle>
            </CardHeading>
            <CardBody>{s.description}</CardBody>
            <CardFooter>
              <p>
                <Link
                  to={{
                    pathname: '/services',
                    hash: s.path
                  }}
                >
                  Details
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  ));

  return (
    <GridSearch
      data={rows}
      filterText={filterText}
      changeFilterText={changeFilterText}
      changeSelected={changeSelected}
      selected={selected}
    />
  );
}

export default Services;
