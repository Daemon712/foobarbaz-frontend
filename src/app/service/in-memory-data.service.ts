import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let defaultDescription = 'Таким образом сложившаяся структура организации играет важную роль в ' +
      'формировании форм развития. Разнообразный и богатый опыт постоянный количественный рост и сфера ' +
      'нашей активности представляет собой интересный эксперимент проверки. Таким образом сложившаяся ' +
      'структура организации играет важную роль в формировании форм развития. Разнообразный и богатый опыт ' +
      'постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки';

    let defaultBody = '<h2>Заголовок</h2>Равным образом новая модель играет важную роль в ' +
      'формировании соответствующий условий активизации. Повседневная практика показывает, ' +
      'что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу ' +
      '(специалистов) участие в <i>формировании модели развития</i>. Таким образом реализация ' +
      'намеченных плановых заданий представляет собой интересный эксперимент проверки модели ' +
      'развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров ' +
      'способствует подготовки и реализации позиций, занимаемых участниками в отношении ' +
      'поставленных задач. <b>Задача организации</b>, в особенности же укрепление и развитие ' +
      'структуры влечет за собой процесс внедрения и модернизации системы обучения кадров, ' +
      'соответствует насущным потребностям. Товарищи! укрепление и развитие структуры в ' +
      'значительной степени обуславливает создание системы обучения кадров, соответствует ' +
      'насущным потребностям.<br/>С другой стороны укрепление и развитие структуры влечет за ' +
      'собой процесс внедрения и модернизации новых предложений. Разнообразный и богатый опыт' +
      ' постоянный количественный рост и сфера нашей активности влечет за собой процесс' +
      ' внедрения и модернизации позиций, <u>занимаемых участниками</u> в отношении поставленных ' +
      'задач. Товарищи! сложившаяся структура организации представляет собой интересный ' +
      'эксперимент проверки новых предложений. Равным образом рамки и место обучения кадров ' +
      'обеспечивает широкому кругу (специалистов) участие в формировании форм развития.';

    let articles = [
      {
        id: 1,
        name: 'Объектно Ориентированное Программирование',
        description: defaultDescription,
        body: defaultBody,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ['ООП', 'Объекты', 'Абстракция'],
        likes: 17,
        liked: true,
        comments: 8,
        views: 59,
      }, {
        id: 2,
        name: 'Операторы в Java',
        description: defaultDescription,
        body: defaultBody,
        author: 'Елена',
        created: new Date('03 02 2017'),
        tags: ['Операторы', 'Синтаксис'],
        likes: 5,
        comments: 2,
        views: 15,
      }, {
        id: 3,
        name: 'Управляющие конструкции',
        description: defaultDescription,
        body: defaultBody,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ['Циклы', 'switch', 'foreach'],
        likes: 9,
        comments: 4,
        views: 15,
      }, {
        id: 4,
        name: 'Коллекции в Java',
        description: defaultDescription,
        body: defaultBody,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ['Коллекции', 'List', 'Map', 'Set'],
        likes: 22,
        liked: true,
        comments: 12,
        views: 103,
      }
    ];

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
        id: 1,
        name: 'Палиндромы',
        description: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        status: ChallengeStatus.NotStarted,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ["Циклы", "Строки"],
        likes: 5,
        liked: true,
        comments: 12,
        views: 52,
        solutions: 12,
        sharedSolutions: 3,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 2,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.InProgress,
        author: 'Марина',
        created: new Date('02 25 2017'),
        tags: ["Рекурсия", "Математика"],
        comments: 4,
        views: 85,
        solutions: 32,
        sharedSolutions: 9,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 3,
        name: 'Сумма элементов',
        description: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        status: ChallengeStatus.Completed,
        author: 'Михаил',
        created: new Date('02 11 2017'),
        tags: ["Массивы", "Циклы"],
        likes: 12,
        views: 110,
        solutions: 56,
        sharedSolutions: 12,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 4,
        name: 'Палиндромы',
        description: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        status: ChallengeStatus.NotStarted,
        author: 'Сергей',
        created: new Date('02 06 2017'),
        tags: ["Циклы", "Строки"],
        likes: 15,
        liked: true,
        comments: 26,
        views: 32,
        solutions: 8,
        sharedSolutions: 2,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 5,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.NotStarted,
        author: 'Анна',
        created: new Date('02 09 2017'),
        tags: ["Рекурсия", "Математика"],
        views: 45,
        solutions: 5,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 6,
        name: 'Сумма элементов',
        description: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        status: ChallengeStatus.InProgress,
        author: 'Аркадий',
        created: new Date('02 11 2017'),
        tags: ["Массивы","Циклы"],
        likes: 3,
        comments: 12,
        views: 30,
        solutions: 7,
        solutionTemplate: defaultSolutionTemplate,
      },
    ];

    let tests: TestResult[] = [
      new TestResult("testOne",       TestStatus.success),
      new TestResult("testTwo",       TestStatus.success),
      new TestResult("testThree",     TestStatus.success),
      new TestResult("testZero",      TestStatus.failed,  "Ожидалось: 1, Результат: 0"),
      new TestResult("testInfinity",  TestStatus.ignored),
      new TestResult("testNegative",  TestStatus.error,   "ArithmeticException"),
    ];

    let tags: Tag[] = [
      new Tag("Массивы", 3),
      new Tag("Списки", 7),
      new Tag("Рекурсия", 12),
      new Tag("Строки", 10),
      new Tag("Математика", 6),
      new Tag("Бинарные операции", 4),
      new Tag("Ввод-вывод", 2),
    ];

    let users = [
      {username: "admin", password: "1234"},
      {username: "user",  password: "1"},
    ];

    let comments = [
      {
        id: 1,
        author: 'Петр',
        text: 'Отличная задача! Решил с удовольствием',
        likes: 3,
        date: new Date('02 11 2017 19:30'),
      },
      {
        id: 2,
        author: 'Оксана',
        text: 'Сложно. Два дня думала(',
        likes: 1,
        date: new Date('02 12 2017 09:51'),
      },
      {
        id: 3,
        author: 'Михаил',
        text: 'Так и не смог решить...',
        date: new Date('02 12 2017 22:46'),
      },
      {
        id: 4,
        author: 'Татьяна',
        text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)',
        date: new Date('02 13 2017 12:01'),
      },
      {
        id: 5,
        author: 'Диана',
        text: 'Слишком просто.',
        likes: 8,
        liked: true,
        date: new Date('02 14 2017 16:24'),
      },
      {
        id: 6,
        author: 'Алексей',
        text: 'В школе такую на паскале решал)',
        likes: 6,
        liked: true,
        date: new Date('02 11 2017 13:55'),
      },
    ];

    let revisions: Revision[] = [
      new Revision(1, SolutionStatus.failed,  new Date("03 02 2017 13:55")),
      new Revision(2, SolutionStatus.empty,   new Date("03 02 2017 16:24")),
      new Revision(3, SolutionStatus.error,   new Date("03 03 2017 12:01")),
      new Revision(4, SolutionStatus.failed,  new Date("03 03 2017 22:46")),
      new Revision(5, SolutionStatus.empty,   new Date("03 04 2017 09:51")),
      new Revision(6, SolutionStatus.success, new Date("03 06 2017 19:30")),
    ];

    let sharedSolutions: SharedSolution[] = [
      {
        id: 1,
        author: 'Анна',
        comment: 'Сделала! Все тесты проходят!',
        status: SolutionStatus.success,
        date: new Date("03 02 2017 13:55"),
        comments: 2,
        likes: 4,
        liked: false,
      },
      {
        id: 2,
        author: 'Сергей',
        comment: 'Ошибка? Где? Не понимаю... Подскажите плиз',
        status: SolutionStatus.error,
        date: new Date("03 03 2017 16:24"),
        comments: 8,
        likes: 0,
        liked: false,
      },
      {
        id: 3,
        author: 'Игорь',
        comment: 'Сделал решение всего в 2 строчки. Зацените!',
        status: SolutionStatus.success,
        date: new Date("03 03 2017 12:03"),
        comments: 0,
        likes: 9,
        liked: true,
      },
      {
        id: 4,
        author: 'Маша',
        comment: 'Думаю, мое решение самое эффективное. Можно еще оптимизировать?',
        status: SolutionStatus.success,
        date: new Date("03 04 2017 19:30"),
        comments: 2,
        likes: 6,
        liked: false,
      },
      {
        id: 5,
        author: 'Олег',
        comment: 'Как пройти последний тест?? Помогите! Я уже голову сломал!',
        status: SolutionStatus.failed,
        date: new Date("03 04 2017 22:14"),
        comments: 12,
        likes: 0,
        liked: false,
      },
  ];

    return {
      articles,
      challenges,
      tests,
      tags,
      users,
      comments,
      revisions,
      sharedSolutions,
    };
  }}

