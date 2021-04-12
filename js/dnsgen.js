$(() => {
	let entries = $("#entries");
	let subnet = '192.168.0.'

	const updateSubnet = () => {
		subnet = $("#ip")[0].value.split('.');
		subnet.pop();
		subnet = subnet.join('.') + '.';
		entries.children().each((i, j) => {
			$(j).find("span")[0].innerHTML = subnet;
		});
	};

	const update = () => {
		updateSubnet();
		gen_forward();
		gen_reverse();
	};

	const gen_ns = () => {
		updateSubnet();
		let ns_dict = new Object();
		//ns_dict[$("#record")[0].value] = $("#ip")[0].value;
		entries.children().each((i, j) => {
			if ($(j).children()[0].value == '') {
				$(j).children()[0].value = $(j).children()[0].placeholder;
			}
			if ($(j).children()[2].value == '') {
				$(j).children()[2].value = $(j).children()[2].placeholder;
			}
			ns_dict[$(j).children()[0].value] = $(j).children()[2].value;
		});
		return ns_dict;
	};

	$("#add-row").click(() => {
		let entry = $(
			`<div class="input-group">
			<input type="text" class="form-control col-6">
			<div class="input-group-prepend"><span class="input-group-text" type="text" id="subnet">${subnet}</span></div>
			<input type="text" class="form-control col-2" placeholder="3" aria-label="ip" aria-describedby="subnet">
			</div>`
		);
		let n = entries.children().length;
		if (entries.children()[n-1].children[2].value == '') {
			let placeholder = $(entries.children()[n-1]).children()[2].placeholder;
			entry.children()[2].palceholder = `${Number(placeholder) + 1}`;
		} else {
			let value = $(entries.children()[n-1]).children()[2].value;
			entry.children()[2].value = `${Number(value) + 1}`;
		}
		entries.append(entry);

		$("input").change(() => {
			update();
		});
	});
	$("#sub-row").click(() => {
		let n = entries.children().length;
		if (n == 1) return;
		entries.children()[n - 1].remove()
	});
	const gen_forward = () => {
		let domain = $("#domain")[0].value;
		let dns1 = $("#record")[0].value;
		let dns_ip = $("#ip")[0].value;
		let ns = gen_ns();
		let zone = `$TTL 604800
@	IN	SOA		${dns1}.${domain}. root.${domain}. (
				      1 	; Serial
				 604800 	; Refresh
				  86400 	; Retry
				2419200 	; Expire
				 604800 	; Negative Cache TTL
)

@	IN	NS 	${dns1}.${domain}.
${dns1}	IN	A 	${dns_ip}\n`;

		for (var record in ns) {
			zone = zone.concat(`${record}	IN	A	${subnet + ns[record]}\n`);
		}
		$("#forward").text(zone);
	};
	const gen_reverse = () => {
		let domain = $("#domain")[0].value;
		let dns1 = $("#record")[0].value;
		let dns_ip = $("#ip")[0].value;
		let ns = gen_ns();
		let zone = `$TTL 604800
@	IN	SOA		${dns1}.${domain}. root.${domain}. (
				      1 	; Serial
				 604800 	; Refresh
				  86400 	; Retry
				2419200 	; Expire
				 604800 	; Negative Cache TTL
)
@	IN	NS	${dns1}.
${dns_ip.split('.')[3]}	IN	PTR	${dns1}.${domain}.\n`;
		
		for (var record in ns) {
			zone = zone.concat(`${ns[record]}	IN	A	${record}\n`);
		}
		$("#reverse").text(zone);
	};

	$("input").change(() => {
		update();
	});

	const make_db = () => {
		let domain = $("#domain")[0].value;
		let dns1 = $("#record")[0].value;
		let dns_ip = $("#ip")[0].value;
		let db = `${domain}&${dns1}&${dns_ip}`;
		let ns = gen_ns();
		for (var record in ns) {
			db = db.concat(`&${record}&${ns[record]}`);
		}
		return db;
	};

	$("#get-forward").click(() => {
		window.location.replace("forward/" + make_db());
	});

	$("#get-reverse").click(() => {

	});

	$("#upload-forward").click(() => {

	});

	$("#upload-reverse").click(() => {

	});

	update();
});