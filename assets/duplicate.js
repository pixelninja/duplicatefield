/*-----------------------------------------------------------------------------
	Language strings
-----------------------------------------------------------------------------*/
	Symphony.Language.add({
		'Duplicate': false
	});

/*-----------------------------------------------------------------------------
	Section Editor
-----------------------------------------------------------------------------*/
	jQuery(function($){
		var fields_wrapper = $('#fields-duplicator'),
			fields = fields_wrapper.find('.instance');

		// Add the trigger to each existing field
		fields.each(function(i) {
			var self = $(this),
				field_header = self.find('.frame-header');

			field_header.after('<a class="duplicate-field">' + Symphony.Language.get('Duplicate') + '</a>');
		});

		$('body').on('click', '.duplicate-field', function(e) {
			e.preventDefault();

			var field = $(this).parent(),
				field_index = field.index(),
				duplicate_field = field.clone(),
				duplicate_field_fields = duplicate_field.find('input, select'),
				duplicate_field_index = fields.length;

			// Go over each new input/select and update the index
			duplicate_field_fields.each(function () {
				var self = $(this),
					name = self.attr('name');

				// If it's an ID field, remove it as this will prevent a new field from being added. Instead the existing field will be updated.
				if (name.indexOf('[id]') > -1) {
					self.remove();
				}
				// Otherwise, we want to update the index
				else {
					self.attr('name', name.replace('[' + field_index + ']', '[' + duplicate_field_index + ']'));
				}
			});

			// Add the new field to the array of all fields, so the index increment works.
			fields.push(duplicate_field);

			// Add the new field to the page
			fields_wrapper.find('ol').append(duplicate_field);

			return false;
		});
	});
