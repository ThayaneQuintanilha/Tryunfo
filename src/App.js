import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    data: [],
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare } = this.state;
      const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
      const number = 90;
      const number2 = 210;
      if (cardName && cardImage
        && cardDescription && cardRare && sum <= number2 && cardAttr1 <= number
        && cardAttr1 >= 0 && cardAttr2 <= number && cardAttr2 >= 0
        && cardAttr3 <= number && cardAttr3 >= 0) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }
    });
  };

  clickButton = (obj) => {
    this.setState((state) => (
      {
        data: [...state.data, obj],
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        hasTrunfo: true,
        isSaveButtonDisabled: true,
      }));
  };

  removeCards = ({ target }) => {
    this.setState({
      hasTrunfo: false,
    });
    target.parentNode.remove();
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      data,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.clickButton }
          onInputChange={ this.onInputChange }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <ul>
          {data.map((cards) => (
            <li key={ cards.cardName }>
              <Card
                cardName={ cards.cardName }
                cardDescription={ cards.cardDescription }
                cardAttr1={ cards.cardAttr1 }
                cardAttr2={ cards.cardAttr2 }
                cardAttr3={ cards.cardAttr3 }
                cardImage={ cards.cardImage }
                cardRare={ cards.cardRare }
                cardTrunfo={ cards.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ this.removeCards }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
