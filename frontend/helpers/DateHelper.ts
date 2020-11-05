import * as moment from 'moment'

export default class DateHelper {
  public static configs: any = {
    datepicker: {
      format: 'DD/MM/YYYY',
      locale: {
        lang: {
          placeholder: 'Selecione uma data',
          rangePlaceholder: ['De', 'Até'],
          today: 'Hoje',
          now: 'Agora',
          backToToday: 'De volta pra hoje',
          ok: 'Ok',
          clear: 'Limpar',
          month: 'Mês',
          year: 'Ano',
          timeSelect: 'Selecione um horário',
          dateSelect: 'Selecione uma data',
          monthSelect: 'Selecione um mês',
          yearSelect: 'Selecione um ano',
          decadeSelect: 'Selecione uma década',
          yearFormat: 'YYYY',
          dateFormat: 'D/M/YYYY',
          dayFormat: 'D',
          dateTimeFormat: 'D/M/YYYY HH:mm:ss',
          monthFormat: 'MMMM',
          monthBeforeYear: true,
          previousMonth: 'Mês anterior (PageUp)',
          nextMonth: 'Próximo mês (PageDown)',
          previousYear: 'Ano anterior (Control + left)',
          nextYear: 'Next year (Control + right)',
          previousDecade: 'Década anterior',
          nextDecade: 'Próxima década',
          previousCentury: 'Século anterior',
          nextCentury: 'Próximo século',
        },
      },
    },
  }

  public static cast(str: string): moment.Moment {
    return moment(str).utcOffset('+00:00')
  }

  public static now(): any {
    return moment().utcOffset('+00:00').format('YYYY-MM-DD HH:mm:SS')
  }

  public static today(): any {
    return moment().utcOffset('+00:00').format('YYYY-MM-DD')
  }

  public static getHour(dt: string): string {
    return moment(dt).utcOffset('+00:00').format('HH:mm')
  }

  public static format(dt: string): string {
    return moment(dt).utcOffset('+00:00').format('YYYY-MM-DD')
  }

  public static formatHuman(dt: string): string {
    return moment(dt).utcOffset('+00:00').format('LL')
  }

  public static formatBrazilian(dt: string): string {
    return moment(dt).utcOffset('+00:00').format('DD/MM/YYYY')
  }
}
