import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { LoaderService } from 'src/app/services/loader.service';
import { FavoriteService } from 'src/app/services/favorite.service';

import { API_CONFIG, apiConfig } from '../api.config'

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  // apiUrl: string = "https://api.themoviedb.org/3"
  // apiKey: string = '0994e7679a856150aadcecf7de489bce'
  // params: string = `&api_key=${this.apiKey}&language=en-EN`
  // movieUrl: string = `${this.apiUrl}/movie`
  // personUrl: string = `${this.apiUrl}/person`

  // searchUrlMovie: string = `${this.apiUrl}/search/movie`
  // searchUrlPerson: string = `${this.apiUrl}/search/person`

  // imgPath: string = 'https://image.tmdb.org/t/p'
  // midImgPath: string = `${this.imgPath}/w500`
  // smallImgPath: string = `${this.imgPath}/w185`
  // bigBackPath: string = `${this.imgPath}/w1280`
  // midBackPath: string = `${this.imgPath}/w780`
  // smallBackPath: string = `${this.imgPath}/w300`



  allFilms$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  allActors$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(@Inject(API_CONFIG)
              public apiConfig: any,
              private http: HttpClient,
              private loaderService: LoaderService,
              private favService: FavoriteService ) {
  }

  getAllFilms(page?: number): Observable<any> {
    this.loaderService.display(true);
    // this.http.get(`${this.movieUrl}/popular?page=${page}${this.params}`)
    this.http.get(`${this.apiConfig.movieUrl}/popular?page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        let ids = [];
        res.results.forEach(el => {
            ids.push(el.id);
        })
        this.favService.getFavor(ids).subscribe((response) => {
         response.forEach(el => {
           res.results.map(elem => {
            if(el._id == elem.id) {
                elem.favorite = true;
              }
            });
          })
        });
      this.allFilms$.next(res);
      })
    this.loaderService.display(false);
    return this.allFilms$.asObservable();
  }

  getAllActors(page?: number): Observable<any> {
    this.loaderService.display(true);
    // this.http.get(`${this.personUrl}/popular?page=${page}${this.params}`)
    this.http.get(`${this.apiConfig.personUrl}/popular?page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        this.allActors$.next(res)
      })
    this.loaderService.display(false);
    return this.allActors$.asObservable();
  }
  
  searchFilm(qwery: any, page?: number) {
    this.loaderService.display(true);
    this.http.get(`${this.apiConfig.searchUrlMovie}?query=${qwery}&page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        this.allFilms$.next(res);
      })
    this.loaderService.display(false);
  }

  searchActors(qwery: any, page?: number) {
    this.loaderService.display(true);
    this.http.get(`${this.apiConfig.searchUrlPerson}?query=${qwery}&page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        this.allActors$.next(res);
      })
    this.loaderService.display(false);
  }

  // films: Film[] = [
  //   {id: 1, name: "Тор: Рагнарёк", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", description: "Вернувшись в Асгард в поисках таинственного врага, ведущего охоту на Камни Бесконечности, Тор обнаруживает, что действия его брата Локи, захватившего трон Асгарда, привели к приближению наиболее страшного события — Рагнарёка.", isFavorite: false },
  //   {id: 2, name: "Чудо-женщина ", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/fMnMonAyK3nzp1P1odIFzYoSvYe.jpg", description: "Перед тем как стать Чудо-Женщиной, она была Дианой — принцессой амазонок, обученной быть непобедимой воительницей. И когда на берегах огражденного ото внешнего мира райского острова, который служил ей родиной, терпит крушение американский пилот и рассказывает о серьезном конфликте, бушующем во внешнем мире, Диана покидает свой дом, чтобы справиться с этой угрозой", isFavorite: true },
  //   {id: 3, name: "Звёздные Войны: Последние джеда", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/qP4gdqvE4KsFqkeY9EdVRCA8ahj.jpg", description: "Баланс Силы снова нарушен, и события развиваются с невероятной скоростью! Рей, Финну, вездесущему дроиду BB-8 и другим героям предстоит опасная схватка с могущественным Первым Орденом.", isFavorite: false },
  //   {id: 4, name: "Бегущий по лезвию 2049", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/lxFTHZHBHRXcuzR9ygpMGP1kEKr.jpg", description: "В недалеком будущем мир населен людьми и репликантами, созданными выполнять самую тяжелую работу. Работа офицера полиции Кей - держать репликантов под контролем в условиях нарастающего напряжения", isFavorite: true },
  //   {id: 5, name: "Лига справедливости", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/e2f1GaWLkk5Sj7cZMi38mUPXYdt.jpg", description: "Понимая, что существуют угрозы, с которыми невозможно справиться в одиночку, Бэтмен и Супермен создают совершенно новую команду, собрав в ней самых могущественных защитников человечества. ", isFavorite: true },
  //   {id: 6, name: "Чужой. Завет", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5ff1DVsSL7CP5zIjr8ayHaaHScP.jpg", description: "Выжившие члены команды «Прометея» Элизабет и андроид Дэвид сделали первый шаг навстречу разгадке тайны инженеров. Теперь пришло время узнать остальную правду, которая укрыта на родной планете белесых великанов — Рай.", isFavorite: false },
  //   {id: 7, name: "Хан Соло: Звёздные Войны. Истории", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/k7sOpf0TeBPUIix8IL5MGCQMFev.jpg", description: "Фильм расскажет о похождениях юного космического сорвиголовы Хана Соло и его верного напарника Чубакки и о том, как они стали самыми быстрыми пилотами и самыми хитрыми контрабандистами далёкой Галактики.", isFavorite: true},
  //   {id: 8, name: "Дэдпул 2", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/ukbLruQbrchScy3jTXgeAz9IWDL.jpg", description: "Выжив после смертоносной атаки быков, изуродованный шеф-повар кафетерия пытается исполнить свою мечту - стать самым горячим барменом в Мэйберри - и в то же время справиться с потерянными вкусовыми ощущениями. Чтобы восстановить остроту чувств, а еще и потоковый накопитель, Уэйд должен будет сразиться с ниндзями, якудзой и стаей сексуально агрессивных собачек, в то время как он объедет весь земной шар и поймет важность семьи, дружбы и вкуса - а заодно обнаружит новую тягу к приключениям и заработает желанную надпись на кружке «Лучший любовник в мире».", isFavorite: false},
  //   {id: 9, name: "Tomb Raider: Лара Крофт", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/6NUZPCujVGbewamFAnRfBKy4F4C.jpg", description: "Лара Крофт - весьма самостоятельная дочь эксцентричного искателя приключений, который пропал, едва она стала подростком. Теперь ей двадцать один, она бесцельно проживает свою жизнь, курьером рассекая на байке по забитым улицам восточного Лондона, а ее заработка едва хватает на оплату квартиры и занятий в колледже. Решительно настроенная пробиться сама, она отказывается брать на себя руководство глобальной империей отца, столь же категорично отвергая мысль о том, что он действительно пропал.", isFavorite: false},
  //   {id: 10, name: "Стражи Галактики", year: "2014", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/L6U6zH3N39toWXIjvfPjxgRXuG.jpg", description: "Отважному путешественнику Питеру Квиллу попадает в руки таинственный артефакт, принадлежащий могущественному и безжалостному злодею Ронану, строящему коварные планы по захвату Вселенной. Питер оказывается в центре межгалактической охоты, где жертва — он сам.", isFavorite: false},
  //   {id: 11, name: "Тихоокеанский рубеж 2", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/hAR6AdEKMVQXrcTt1hnaEU7YvSX.jpg", description: "Команда пилотируемых роботов-защитников остановила вторжение гигантских инопланетных монстров. Великая битва за Тихоокеанский рубеж ознаменовала новую главу в истории человечества. Однако война только начинается… Пришло время нового поколения отстаивать своё право на Землю.", isFavorite: false},
  //   {id: 12, name: "Интерстеллар", year: "2014", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5IGqQ86P8dfpNShocqz8rx38mv0.jpg", description: "Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества; путешествуя за пределами нашей галактики, чтобы узнать есть ли у человечества будущее среди звезд.", isFavorite: false},
  // ]; 


}
