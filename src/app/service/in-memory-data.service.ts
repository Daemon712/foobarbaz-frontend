import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";
import {Solution} from "../model/solution";
import {SolutionStatus} from "../model/solutions-status";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {username: "admin", account: {description: "Создатель и действующий администратор сообщества"}},
      {username: "moderator", account: {description: "Модератор, который модерирует"}},
      {username: "user", account: {description: "Типичный пользователь"}},
      {username: "Игорь", account: {description: "Выпьем за любовь?"}},
      {username: "Анна", account: {description: "Описание Описание Описание"}},
      {username: "Борис", account: {description: "Олег, где макет?"}},
      {username: "Марина", account: {description: "Доброе утро"}},
      {username: "Сергей", account: {description: "Добрый вечер"}},
      {username: "Николай", account: {description: "Ла ла ли ла лай"}},
      {username: "Владимир", account: {description: "..."}},
    ];

    users.forEach((u: any) => {
      u.password = '1234';
      u.account.username = u.username;
      u.account.created = this.randomDate(u.username);
      u.account.rating = this.randomNumber(0, 500, u.username);
      u.account.challenges = this.randomNumber(0, 6, u.username);
      u.account.playlists = this.randomNumber(0, 2, u.username);
      u.account.solved = this.randomNumber(0, 15, u.username);
      u.account.comments = this.randomNumber(0, 10, u.username);
      u.account.sharedSolutions = this.randomNumber(0, 8, u.username);
    });

    let tests: TestResult[] = [
      new TestResult("testOne",       TestStatus.success),
      new TestResult("testTwo",       TestStatus.success),
      new TestResult("testThree",     TestStatus.success),
      new TestResult("testZero",      TestStatus.failed,  "Ожидалось: 1, Результат: 0"),
      new TestResult("testInfinity",  TestStatus.ignored),
      new TestResult("testNegative",  TestStatus.error,   "ArithmeticException"),
    ];

    let defaultDescription = '<h2>Заголовок</h2>Равным образом новая модель играет важную роль в ' +
      'формировании соответствующий условий активизации. Повседневная практика показывает, ' +
      'что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу ' +
      '(специалистов) участие в <i>формировании модели развития</i>. Таким образом реализация ' +
      'намеченных плановых заданий представляет собой интересный эксперимент проверки модели ' +
      'развития.<br/>Идейные соображения высшего порядка, а также рамки и место обучения кадров ' +
      'способствует подготовки и реализации позиций, занимаемых участниками в отношении ' +
      'поставленных задач. <b>Задача организации</b>, в особенности же укрепление и развитие ' +
      'структуры влечет за собой процесс внедрения и модернизации системы обучения кадров, ' +
      'соответствует насущным потребностям. <u>Товарищи!</u> укрепление и развитие структуры в ' +
      'значительной степени обуславливает создание системы обучения кадров, соответствует ' +
      'насущным потребностям.';

    let defaultSolutionTemplate =
      "public class Foo {\n" +
      "\tpublic int sum(int[] array) {\n" +
      "\t\tint x = 0;\n" +
      "\t\t\n" +
      "\t\t//...\n" +
      "\t\t\n" +
      "\t\treturn x;\n" +
      "\t}\n}";

    let challenges = [
      {
        name: 'Палиндромы',
        abstract: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        tags: ["Циклы", "Строки"],
      },
      {
        name: 'Факториал',
        abstract: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        tags: ["Рекурсия", "Математика"],
      },
      {
        name: 'Сумма элементов',
        abstract: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        tags: ["Массивы", "Циклы"],
      },
      {
        name: 'Hello world',
        abstract: 'Все просто! Выведите на экран фразу "Hello world!"',
        tags: ["Строки"],
      },
      {
        name: 'Возведение в степень',
        abstract: 'Есть два целых число a и b. Программа должна вычеслить a в степени b',
        tags: ["Рекурсия", "Математика"],
      },
      {
        name: 'Сумма элементов дерева',
        abstract: 'Вам дано дерево. Каждый элемент дерева содержит число, посчитайте сумму всех этих чисел',
        tags: ["Дерево","Рекурсия"],
      },
      {
        name: 'Число Фибоначчи',
        abstract: 'На вход программе подается число N, верните N-ое число в последовательности чисел Фибоначчи',
        tags: ["Математика","Рекурсия","Последовательность"],
      },
      {
        name: 'Наименьшее из 3 чисел',
        abstract: 'Вам дано 3 числа: a, b, c. Верните наибольшее из них',
        tags: ["Числа"],
      },
      {
        name: 'Четность числа',
        abstract: 'Есть число. Верните true, если оно четное. Иначе верните false',
        tags: ["Числа"],
      },
      {
        name: 'Убрать гласные из строки',
        abstract: 'Вам дана строка состоящая из букв латинского алфавита, цифр и заков препинания. Верните кописю строки без гласных букв (a, e, u, i, o)',
        tags: ["Строки"],
      },
      {
        name: 'Количество четных элементов',
        abstract: 'На вход программе подается массив целых чисел. Посчитайте количество четных чисел в массиве',
        tags: ["Массивы","Числа"],
      },
      {
        name: 'Бесконечный поезд',
        abstract: 'Представьте себе замкнутую по окружности железную дорогу. По ней едет поезд. Вы оказались в одном случайном вагоне и ваша задача — подсчитать их общее количество.',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Сбрасываем яйцо с небоскреба',
        abstract: 'Дано M-этажное здание. Если яйцо сбросить с высоты этажа N или больше, оно разобьется. У вас есть два яйца. Найдите N за минимальное количество бросков.',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Задача о ферзях',
        abstract: 'Расставить максимальное количество взаимно не бьющих друг друга ферзей на прямоугольном поле со сторонами A и B',
        tags: ["Массивы","Шахматы"],
      },
      {
        name: 'Ханойская башня',
        abstract: 'Есть 3 стержня. На первом стержне надета пирамидка из N дисков. Диски можно перекладывать на другой стержень, но на диск нельзя класть другой диск большео размера. Переложите пирамидку на 3 стержень',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Проверка на анаграмму',
        abstract: 'Программе подается на вход 2 строки: str1 и str2. Верните true, если str1 является анаграммой str2',
        tags: ["Строки"],
      },
      {
        name: 'Самое большое произведение',
        abstract: 'Дан массив целых чисел. Необходимо найти наибольшее произведение из 3 чисел этого массива',
        tags: ["Логика","Числа"],
      },
    ];

    for (let i = 0; i < challenges.length; i++) {
      let c: any = challenges[i];
      c.id = i + 1;
      c.solutionTemplate = defaultSolutionTemplate;
      c.description = defaultDescription;
      c.created = this.randomDate(c.name);
      c.rating = this.randomNumber(1, 9)/10;
      c.difficulty = this.randomNumber(1, 9)/10;
      c.comments = this.randomNumber(0, 12, c.name);
      c.sharedSolutions = this.randomNumber(0, 8, c.name);
      c.views = this.randomNumber(50, 300, c.name);
      c.completedSolutions = this.randomNumber(0, 20, c.name);
      c.status = this.randomItem([
        ChallengeStatus.Completed, ChallengeStatus.InProgress, ChallengeStatus.InProgress,
        ChallengeStatus.NotStarted, ChallengeStatus.NotStarted, ChallengeStatus.NotStarted,
        ChallengeStatus.NotStarted, ChallengeStatus.NotStarted, ChallengeStatus.NotStarted], c.name);
      c.author = this.randomItem(users, c.name).username;
      c.solutions = [];
      if (c.status != ChallengeStatus.NotStarted){
        for (let j = 1; j < this.randomNumber(2, 8, c.name); j++){
          let s = new Solution();
          s.id = j;
          let seed = '' + (1 + 11 * c.id) * (1 + 7 * s.id);
          s.name = 'Решение №' + j;
          s.status = this.randomItem([SolutionStatus.failed, SolutionStatus.empty, SolutionStatus.error], seed);
          s.solution = defaultSolutionTemplate
            .replace('= 0', '= ' + this.randomItem(['array.length', 'array[0] + array[1]', '2 * array.length'], seed))
            .replace('//...', 'x = ' + this.randomItem(['x * x', 'x + x', '10 + x * 2'], seed) + ';');
          if (s.status != SolutionStatus.empty){
            s.testResults = tests.map(tr => Object.assign({}, tr));
          }
          c.solutions.push(s);
        }
      }
      if (c.status == ChallengeStatus.Completed) {
        let s = new Solution();
        s.id = c.solutions.length + 1;
        s.name = 'Решение №' + s.id;
        s.status = SolutionStatus.success;
        s.solution = defaultSolutionTemplate;
        s.testResults = tests.map(tr => Object.assign({}, tr));
        s.testResults.forEach(tr => {tr.status = TestStatus.success;tr.message = ''});
        c.solutions.push(s);
      }
    }

    let playlists = [
      {
        name: 'ТОП 5 задач с рекурсией',
        description: 'Чтобы понять рекурсию, надо понять рекурсию',
        challenges: [
          challenges[1],
          challenges[4],
          challenges[5],
          challenges[6],
        ]
      },
      {
        name: 'Лучшие задачки для новичка',
        description: 'Задачи самые простые, хорошо для тех кто только начал писать программы',
        challenges: [
          challenges[3],
          challenges[7],
          challenges[8],
          challenges[9],
          challenges[10],
        ]
      },
      {
        name: 'Сломай себе мозг!',
        description: '96% населения земли не могут решить эти задачи. А ты?',
        challenges: [
          challenges[11],
          challenges[12],
          challenges[13],
        ]
      },
      {
        name: 'Задачи, которые должен решить каждый!',
        description: 'Самые популярные задачи на собеседованиях',
        challenges: [
          challenges[14],
          challenges[15],
          challenges[16],
        ]
      },
      {
        name: 'просто все задачи',
        description: 'потому что могу',
        challenges: challenges
      }
    ];

    for (let i = 0; i < playlists.length; i++){
      let p: any = playlists[i];
      p.id = i + 1;
      p.created = this.randomDate(p.name);
      p.author = this.randomItem(users, p.name).username;
    }

    let tags: Tag[] = [
      new Tag("Массивы", 3),
      new Tag("Списки", 7),
      new Tag("Рекурсия", 12),
      new Tag("Строки", 10),
      new Tag("Математика", 6),
      new Tag("Бинарные операции", 4),
      new Tag("Ввод-вывод", 2),
    ];

    let sharedSolutions: any[] = [
      {
        comment: 'Сделано! Все тесты проходят!',
        status: SolutionStatus.success,
      },
      {
        comment: 'Ошибка? Где? Не понимаю... Подскажите плиз',
        status: SolutionStatus.error,
      },
      {
        comment: 'Сделал решение всего в 2 строчки. Зацените!',
        status: SolutionStatus.success,
      },
      {
        comment: 'Думаю, мое решение самое эффективное. Можно еще оптимизировать?',
        status: SolutionStatus.success,
      },
      {
        comment: 'Как пройти последний тест?? Помогите! Я уже голову сломал!',
        status: SolutionStatus.failed,
      },
    ];

    for (let i = 0; i < sharedSolutions.length; i++){
      let ss = sharedSolutions[i];
      ss.id = i+1;
      ss.challengeId = this.randomItem(challenges, ss.comment).id;
      ss.author = this.randomItem(users, ss.comment).username;
      ss.text = defaultSolutionTemplate;
      ss.date = this.randomDate(ss.comment);
      ss.testResults = tests;
      ss.comments = this.randomNumber(0, 8, ss.comment);
      ss.likes = this.randomNumber(0, 16, ss.comment);
      ss.liked = this.randomItem([true, false, false], ss.comment);
    }

    let comments = [
      { text: 'Отличная задача! Решил с удовольствием'},
      { text: 'Сложно. Два дня думала('},
      { text: 'Так и не смог решить...'},
      { text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)'},
      { text: 'Слишком просто.'},
      { text: 'В школе такую на паскале решал)'},
      { text: 'Интересное решение...'},
      { text: 'Вместо LinkedList лучше использовать ArrayList'},
      { text: 'Похоже на спаггети)'},
      { text: 'Добрый вечер'},
    ];
    comments.forEach(c => comments.push(Object.assign({}, c)));

    for (let i = 0; i< comments.length; i++){
      let c: any = comments[i];
      c.id = i + 1;
      c.text += this.randomItem(['!','','.'], ''+i);
      c.challengeId = this.randomItem(challenges, c.text).id;
      if (Math.random() > 0.5) c.sharedSolId = this.randomItem(sharedSolutions, c.text).id;
      c.author = this.randomItem(users, c.text).username;
      c.date = this.randomDate(c.text);
      c.likes = this.randomNumber(0, 15, c.text);
      c.liked = this.randomItem([true, false, false], c.text);
    }

    return {
      challenges,
      tests,
      tags,
      users,
      comments,
      sharedSolutions,
      playlists,
    };
  }

  randomItem(items: any[], seed?: string): any{
    if (!seed) return items[Math.floor(Math.random())];
    let h = this.hash(seed);
    return items[h % items.length];
  }

  randomDate(seed: string): Date{
    let h = this.hash(seed);
    return new Date(2017, 1 + h % 6, 1 + h % 28);
  }

  randomNumber(min: number, max: number, seed?: string): number{
    if (!seed) return min + Math.random() * (max-min);

    let h = this.hash(seed);
    return min + h % (max-min);
  }

  hashCache = {};
  hash(value: string): number{
    if (this.hashCache[value])
      return this.hashCache[value];

    let h = 0;
    for (let i = 0; i < value.length; i++) {
      h = 31 * h + value.charCodeAt(i);
    }
    this.hashCache[value] = h;
    return h;
  }
}

