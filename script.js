jQuery(function($) {
	$('body').on('click', '.btn__action', function() {
		const action = $(this).data('action');

		if ( 'clear_all' === action ) {
			clearAll();
		} else if ( 'item_add' === action ) {
			itemAdd();
		} else if ( 'item_remove' === action ) {
			itemRemove( $(this) );
		}
	});

	$('body').on('change', '.cost, .quantity', function() {
		const $item = $(this).closest('.item');
		calculateBaseUnitCost( $item );
		highlightBestOption();
	});

	function clearAll() {
		$('.btn_remove').each(function() {
			itemRemove( $(this) );
		});

		const $item = $('.item');
		$item.find('.cost').val('');
		$item.find('.quantity').val('');
		$item.find('.base-unit-cost').text('?');

		$('.item_best').removeClass('item_best');
	}

	function itemAdd() {
		const $newItem = $('#template__item').contents().clone();
		const $items = $('.items');

		$items.append($newItem);
	}

	function itemRemove( $btn ) {
		const $item = $btn.closest('.item');
		$item.remove();
	}

	function calculateBaseUnitCost( $item ) {
		const cost = parseInt( $item.find('.cost').val() );
		const quantity = parseInt( $item.find('.quantity').val() );
		const baseUnit = parseInt( $('#base_unit').val() );

		const baseUnitCost = cost / quantity * baseUnit;

		if ( isNaN( baseUnitCost ) ) return;

		$item.find('.base-unit-cost').text(baseUnitCost);
	}

	function highlightBestOption() {
		$('.item_best').removeClass('item_best');

		let best = false;
		let arBest = [];

		$('.base-unit-cost').each(function() {
			const cost = $(this).text();

			if ( '?' == cost ) return;

			const $item = $(this).closest('.item');

			if ( false == best ) {

				arBest.push($item);
				best = cost;
			} else if ( cost == best ) {

				arBest.push($item);
			} else if ( cost < best ) {

				arBest = [$item];
				best = cost;
			}
		});

		$.each(arBest, function( index, $item ) {
			$item.addClass('item_best');
		});
	}
});