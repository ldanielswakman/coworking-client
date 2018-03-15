Vue.component('space-openinghours', {

  props: ['googlePlace'],

  template: `
    <p class="u-mr4 u-mt2 u-opacity50">
      <span v-if="openingHours.text" v-html="openingHours.text"></span>
      <small v-if="openingHours.open_now" class="pill pill-greylighter u-ml1">
        <span class="pill__status pill__status--green"></span>
        <strong>OPEN NOW</strong>
      </small>
    </p>
  `,

  data() {
    return {
      weekdays: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  },

  computed: {

    openingHours() {
      output = {
        'open_now': false,
        'text': '',
      };

      if(this.googlePlace.opening_hours) {

        opening_hours = this.googlePlace.opening_hours;
        output.open_now = opening_hours.open_now;
        output.text = '';

        for(i in opening_hours.periods) {
          // day parameters
          current = {
            'day': opening_hours.periods[i].open.day - 1,
            'open_time': opening_hours.periods[i].open.time,
            'close_time': opening_hours.periods[i].close.time,
          };

          // initiate sequence on first day
          if(i == 0) { seq_start = current }

          // When detecting sequence interruption, build output of sequence and reset
          if(current.open_time !== seq_start.open_time || current.close_time !== seq_start.close_time) {
            output.text += this.outputOpeningHourSequence(seq_start, current.day - 1);
            output.text += ', ';

            seq_start = current;
          }
        }

        // Build final output
        output.text += this.outputOpeningHourSequence(seq_start, current.day);
      }
      return output;
    },

  },

  methods: {

    outputOpeningHourSequence(seq_start, ref_day) {

      if(parseInt(seq_start.open_time) <= 0 && parseInt(seq_start.close_time) <= 0) {
        return '';
      }

      string = this.weekdays[seq_start.day];
      if(seq_start.day < ref_day) { string += '-' + this.weekdays[ref_day]; }
      string += ' ';
      string += parseInt(seq_start.open_time)/100;
      string += '—';
      string += parseInt(seq_start.close_time)/100;
      string += 'h';

      return string;
    }

  }
  
});
