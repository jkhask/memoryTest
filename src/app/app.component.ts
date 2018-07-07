import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public snackBar: MatSnackBar) {}

  gameCards: any = [];
  redScore: number;
  blueScore: number;
  currentPlayer: string;
  cardsSelected: number;
  card1: any;
  card2: any;
  redCards: any;
  blueCards: any;
  winSnack: any;
  allCards = [
    { id: 0,  showIcon: false, isMatched: false, class: '', icon: 'help'           },
    { id: 1,  showIcon: false, isMatched: false, class: '', icon: 'help'           },
    { id: 2,  showIcon: false, isMatched: false, class: '', icon: 'face'           },
    { id: 3,  showIcon: false, isMatched: false, class: '', icon: 'face'           },
    { id: 4,  showIcon: false, isMatched: false, class: '', icon: 'favorite'       },
    { id: 5,  showIcon: false, isMatched: false, class: '', icon: 'favorite'       },
    { id: 6,  showIcon: false, isMatched: false, class: '', icon: 'videocam'       },
    { id: 7,  showIcon: false, isMatched: false, class: '', icon: 'videocam'       },
    { id: 8,  showIcon: false, isMatched: false, class: '', icon: 'functions'      },
    { id: 9,  showIcon: false, isMatched: false, class: '', icon: 'functions'      },
    { id: 10, showIcon: false, isMatched: false, class: '', icon: 'filter_vintage' },
    { id: 11, showIcon: false, isMatched: false, class: '', icon: 'filter_vintage' },
    { id: 12, showIcon: false, isMatched: false, class: '', icon: 'lens'           },
    { id: 13, showIcon: false, isMatched: false, class: '', icon: 'lens'           },
    { id: 14, showIcon: false, isMatched: false, class: '', icon: 'whatshot'       },
    { id: 15, showIcon: false, isMatched: false, class: '', icon: 'whatshot'       },
    { id: 16, showIcon: false, isMatched: false, class: '', icon: 'time_to_leave'  },
    { id: 17, showIcon: false, isMatched: false, class: '', icon: 'time_to_leave'  },
  ];

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    if (this.winSnack !== undefined) { this.winSnack.dismiss(); }
    for (const card of this.allCards) {
      card.showIcon = false;
      card.isMatched = false;
      card.class = '';
    }
    this.gameCards = _.shuffle(this.allCards);
    this.currentPlayer = 'Red';
    this.cardsSelected = 0;
    this.card1 = {};
    this.card2 = {};
    this.redScore = 0;
    this.blueScore = 0;
    this.redCards = [];
    this.blueCards = [];
    this.snackBar.open(`${this.currentPlayer}'s turn`, '', {
      duration: 1000
    });
  }

  chooseCard(card) {
    if (card.id === this.card1.id) { return; } // clicking the same card does nothing
    if (card.isMatched) { return; } // clicking a matched card does nothing
    this.cardsSelected++;
    if (this.cardsSelected > 2) { return; } // prevent player from rapidly selecting more than 2 cards
    card.showIcon = true;
    if (this.cardsSelected === 1) {
      this.card1 = card;
    } else if (this.cardsSelected === 2) {
      this.card2 = card;
      this.changeTurn();
    }
  }

  async changeTurn() {
    // check for a match
    if (this.card1.icon === this.card2.icon) {
      await this.match();
    } else {
      await this.noMatch();
    }
    this.cardsSelected = 0;
    // check for win
    if (this.redCards.length + this.blueCards.length === this.gameCards.length / 2) {
      if (this.redScore > this.blueScore) {
        this.currentPlayer = 'Red';
      } else {
        this.currentPlayer = 'Blue';
      }
      this.winSnack = this.snackBar.open(`${this.currentPlayer} wins!`);
      return;
    }
    (this.currentPlayer === 'Red') ? this.currentPlayer = 'Blue' : this.currentPlayer = 'Red';
    this.snackBar.open(`${this.currentPlayer}'s turn`, '', {
      duration: 1000
    });
  }

  match(): Promise<any> {
    return new Promise(resolve => {
      this.snackBar.open('Match!', '', {
        duration: 1000
      });
      setTimeout(() => {
        const matchedCards = _.filter(this.gameCards, (card: any) => {
          if (card.id === this.card1.id || card.id === this.card2.id) {
            return true;
          }
        });
        if (this.currentPlayer === 'Red') {
          this.redScore++;
          this.redCards.push(matchedCards[0]);
          this.card1.class = 'red';
          this.card2.class = 'red';
        } else {
          this.blueScore++;
          this.blueCards.push(matchedCards[0]);
          this.card1.class = 'blue';
          this.card2.class = 'blue';
        }
        this.card1.isMatched = true;
        this.card2.isMatched = true;
        resolve();
      }, 1500);
    });
  }

  noMatch(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.card1.showIcon = false;
        this.card2.showIcon = false;
        resolve();
      }, 1500);
    });
  }
}
