import { ForensicCardSnapshot } from '../../../shared/api/firebase/GameSnapshot';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { GameInstanceSnapshot } from '../../../shared/api/firebase/GameSnapshot';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forensic-deck',
  templateUrl: './forensic-deck.component.html',
  styleUrls: ['./forensic-deck.component.scss']
})
export class ForensicDeckComponent implements OnInit {
  forensicCards: Observable<ForensicCardSnapshot[]>;
  constructor(public gameApi: GameApiService) {
    this.forensicCards = this.gameApi.gameReference.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as GameInstanceSnapshot;
        let cards = [];
        cards.push(data.causeCard);
        cards.push(data.locationCard);
        console.log('Other cards');
        console.log(data.otherCards);
        cards = cards.concat(data.otherCards);
        console.log('All cards');
        console.log(cards);
        return cards;
      })
    );
  }

  ngOnInit() {}
}
