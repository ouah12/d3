import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import 'rxjs/add/operator/toPromise';

declare let bodybuilder: any;

@Injectable()
export class ElasticSearchService {

  public cli: Client;

  constructor() {
    this.cli = new Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }

  getDocument(dateFrom, dateTo): Promise<any> {
    return this.cli.search({
      index: 'blog',
      type: 'posts',
      body: {
          query: {
              match: {
                  'PostName': 'Node.js'
              }
          }
      }
    }).then(function(resp) {
        console.log(resp);
    }, function(err) {
    });
  }
}
